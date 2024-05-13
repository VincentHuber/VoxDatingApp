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
  setKey,
  setDefaults,
  setLanguage,
  setRegion,
  fromAddress,
  fromLatLng,
  fromPlaceId,
  setLocationType,
  geocode,
  RequestType,
} from "react-geocode";

//API KEY = AIzaSyDcBOehuphmGfEVNkKPJInhvIckFdUEL-A

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

export default function CityScreen({ navigation }) {
  
  
  //Valeur de l'id
  const [id, setId] = useState(null);

  //Valeur de l'adresse
  const[location, setLocation] = useState(null)


  //Paramètre de google maps API
  setDefaults({
    key: "AIzaSyDcBOehuphmGfEVNkKPJInhvIckFdUEL-A",
    language: "fr", 
    region: "fr", 
  });


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




  //MAJ de la location + navigation
  const locationClick = async () => {

    try {
      
      //Utilisation du géocodage + nav
      const response = await fromAddress(location);

      if (response.results) {
        const { lat, lng } = response.results[0].geometry.location;

        //MAJ de la location du user
        if (id) {
          await updateDoc(doc(db, "users", id), {
            location: { lat, lng },
          });
          navigation.navigate("Audio")
        } else {
          console.log("ID is undefined or null");
        }
      } else {
        console.error("No results found for the given address");
        Alert.alert("Erreur", "Aucun résultat trouvé pour l'adresse donnée.");
      }
    } catch (error) {
      console.error("Location failed :", error);
      Alert.alert("Erreur", "L'adresse n'est pas valide.");
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
        TROUVE DES MATCHS À PROXIMITÉ
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
        Tu pourras mettre ta localisation à jour dans ton profil.
      </Text>

      <TextInput
        onChangeText={(value) => setLocation(value)}
        placeholder="22 rue de Montreuil, Paris"
        placeholderTextColor={"#808080"}

        value={location}
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
          onPress={() => locationClick()}
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
