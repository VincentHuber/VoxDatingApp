import {
    TouchableOpacity,
    TextInput,
    Image,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Alert,
  } from "react-native";
  import {
    useFonts,
    Lexend_900Black,
    Lexend_800ExtraBold,
    Lexend_700Bold,
    Lexend_600SemiBold,
    Lexend_400Regular,
    Lexend_500Medium,
    Lexend_300Light,
    Lexend_200ExtraLight,
    Lexend_100Thin,
  } from "@expo-google-fonts/lexend";
  import React, { useEffect, useState } from "react";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { updateDoc, doc } from "firebase/firestore";
  import { db } from "../../firebase";
  
  
  export default function UsernameScreen({ navigation }) {
  
    //Valeur de l'id
    const [id, setId] = useState(null);
  
    //Valeur de l'input username
    const [username, setUsername] = useState("");
  
  
    //Récupère l'id dans l'AsyncStorage
    useEffect(() => {
      const fetchToken = async () => {
        try {
          let userData = await AsyncStorage.getItem("@user");
          if (userData !== null) {
            userData = JSON.parse(userData);
            setId(userData.uid);
          }
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des données utilisateur :",
            error
          );
        }
      };
      fetchToken();
    }, []);
  
  
    //MAJ du username + navigation
    const usernameClick = async () => {
      if (username.trim() === "") {
        Alert.alert("Champ obligatoire", "Entre ton pseudo pour continuer.");
      } else {
        if (id) {
          await updateDoc(doc(db, "users", id), {
            username: username,
          })
            .then(() => {
              navigation.navigate("Age");
            })
            .catch((error) => {
              console.log("Username not updated : ", error);
            });
        } else {
          console.log("ID is undefined or null");
        }
      }
    };
  
  
    //Chargement de la police
    const [fontsLoaded] = useFonts({
      Lexend_900Black,
      Lexend_800ExtraBold,
      Lexend_700Bold,
      Lexend_600SemiBold,
      Lexend_500Medium,
      Lexend_400Regular,
      Lexend_300Light,
      Lexend_200ExtraLight,
      Lexend_100Thin,
    });
  
  
    //Attente de le chargement de la police
    if (!fontsLoaded) {
      return null;
    }
  
    
    return (
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: "black",
        }}
      >
        <Text
          style={{
            width: "80%",
            marginTop: 25,
  
            textAlign: "center",
            fontFamily: "Lexend_900Black",
            fontSize: 34,
            color: "white",
          }}
        >
          TON PSEUDO ?
        </Text>
  
        <Text
          style={{
            width: "80%",
            marginTop: 20,
  
            textAlign: "center",
            fontFamily: "Lexend_400Regular",
            fontSize: 18,
            color: "white",
          }}
        >
          Il sera affiché sur ton profil et tu pourras le modifier dans tes
          paramètres si nécessaire.
        </Text>
  
        <TextInput
          onChangeText={(value) => setUsername(value)}
          placeholder="Morgan"
          placeholderTextColor={"#808080"}
          value={username}
          style={{
            backgroundColor: "#292929",
            width: "80%",
            height: 55,
            borderRadius: 13,
            paddingLeft: 17,
            paddingRight: 17,
            marginTop: 25,
            textAlign: "center",
  
            color: "white",
            fontFamily: "Lexend_400Regular",
            fontSize: 18,
          }}
        />
  
        <View
          style={{
            width: "80%",
            marginTop: 25,
            alignItems: "flex-end",
          }}
        >
          <TouchableOpacity
            onPress={() => usernameClick()}
            style={{
              height: 55,
              width: 55,
              borderRadius: 14,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
            }}
            activeOpacity={0.2}
          >
            <Image
              source={require("../../assets/arrow.png")}
              style={{
                width: 16,
                height: 22,
              }}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create();
  