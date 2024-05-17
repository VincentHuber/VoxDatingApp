import {
  TouchableOpacity,
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


export default function WishedGenderScreen({ navigation }) {

  //Valeur de l'id
  const [id, setId] = useState(null);

  //Valeur de l'input gender
  const [gender, setGender] = useState([]);

  //Change la couleur du bouton man
  const [manIsClicked, setManIsClicked] = useState(false)

  //Change la couleur du bouton woman
  const [womanIsClicked, setWomanIsClicked] = useState(false)

  //Change la couleur du bouton woman
  const [otherIsClicked, setOtherIsClicked] = useState(false)
   

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


  // Ajoute ou retire man de gender
  const manClick = () => {

    setManIsClicked(!manIsClicked);
  
    if (!manIsClicked) {
      setGender(prevGender => [...prevGender, "man"]);
    } else {
      setGender(prevGender => prevGender.filter(item => item !== "man"));
    }
  };
  

  // Ajoute ou retire woman de gender
  const womanClick = () =>{

    setWomanIsClicked(!womanIsClicked)

    if(!womanIsClicked){
      setGender(prevGender =>[...prevGender, "woman"])
    } else{
      setGender(prevGender => prevGender.filter(item => item !== "woman"))
    }
  }


  // Ajoute ou retire other de gender
  const otherClick = () =>{

    setOtherIsClicked(!otherIsClicked)

    if(!otherIsClicked){
      setGender(prevGender =>[...prevGender, "other"])
    } else{
      setGender(prevGender => prevGender.filter(item => item !== "other"))
    }
  }
  

  //MAJ du WishedGender + navigation
  const genderClick = async () => {

    if (gender.length === 0) {
      Alert.alert("Champ obligatoire", "Tu dois sélectionner au moins un genre.");

    } else {

      if (id) {
        await updateDoc(doc(db, "users", id), {
          wishedGender: gender,
        })
          .then(() => {
            navigation.navigate("City");
          })
          .catch((error) => {
            console.log("Gender not updated : ", error);
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
        QUI VEUX-TU RENCONTRER ?
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
        Tu pourras le changer plus tard dans ton profil.
      </Text>

      <TouchableOpacity
        onPress={()=> manClick()}
        style={{
          backgroundColor: manIsClicked ? "white" : "#292929",
          width: "80%",
          height: 55,
          borderRadius: 13,
          paddingLeft: 17,
          paddingRight: 17,
          marginTop: 25,
          justifyContent:"center"
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: manIsClicked ? "black" : "white",
            fontFamily: "Lexend_400Regular",
            fontSize: 18,
          }}
        >
          Homme
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={()=> womanClick()}
        style={{
          backgroundColor: womanIsClicked ? "white" : "#292929",
          width: "80%",
          height: 55,
          borderRadius: 13,
          paddingLeft: 17,
          paddingRight: 17,
          marginTop: 8,
          justifyContent:"center"
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: womanIsClicked ? "black" : "white",
            fontFamily: "Lexend_400Regular",
            fontSize: 18,
          }}
        >
          Femme
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        onPress={()=> otherClick()}
        style={{
          backgroundColor: otherIsClicked ? "white" : "#292929",
          width: "80%",
          height: 55,
          borderRadius: 13,
          paddingLeft: 17,
          paddingRight: 17,
          marginTop: 8,
          justifyContent:"center"
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: otherIsClicked ? "black" : "white",
            fontFamily: "Lexend_400Regular",
            fontSize: 18,
          }}
        >
          Autre
        </Text>
      </TouchableOpacity>

      <View
        style={{
          width: "80%",
          marginTop: 25,
          alignItems: "flex-end",
        }}
      >
        <TouchableOpacity
          onPress={() => genderClick()}
          style={{
            height: 55,
            width: 55,
            borderRadius: 14,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
          }}
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
