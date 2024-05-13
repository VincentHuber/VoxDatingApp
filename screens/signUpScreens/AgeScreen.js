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
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

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

export default function AgeScreen({ navigation }) {
  //Valeur de l'id
  const [id, setId] = useState(null);

  //Valeur de l'input DOB
  const [age, setAge] = useState("");

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

  //MAJ du DOB + navigation
  const ageClick = async () => {
    if (age >= 18) {
      if (id) {
        await updateDoc(doc(db, "users", id), {
          age: age,
        })
          .then(() => {
            navigation.navigate("Gender");
          })
          .catch((error) => {
            console.log("Age not updated : ", error);
          });
      } else {
        console.log("Age is undefined or null");
      }
    } else {
      Alert.alert(
        "Patience",
        "Tu es encore trop jeune pour utiliser cette app"
      );
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

  //Attente du chargement de la police
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
        TON ÂGE ?
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
        Il ne sera pas affichée sur ton profil.
      </Text>

      <TextInput
        onChangeText={(value) => setAge(value)}
        value={age}
        placeholder="18"
        placeholderTextColor={"#808080"}
        keyboardType="numeric"
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
          onPress={() => ageClick()}
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
