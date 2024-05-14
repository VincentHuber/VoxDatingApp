import {
  TouchableOpacity,
  StyleSheet,
  Text,
  SafeAreaView,
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


export default function GenderScreen({ navigation }) {

  //Valeur de l'id
  const [id, setId] = useState(null);


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


  // MAJ du gender man + navigation
  const manClick = async () => {

    let gender = "man"

    if (id) {
      await updateDoc(doc(db, "users", id), {
        Gender: gender,
      })
        // .then(() => {
        //   console.log("Man gender updated");
        // })
        .catch((error) => {
          console.log("Man gender not updated : ", error);
        });

      navigation.navigate("WishedGender");
    } else {
      console.log("ID is undefined or null");
    }
  };


  // MAJ du gender woman + navigation
  const womanClick = async () => {

    let gender = "woman"

    if (id) {
      await updateDoc(doc(db, "users", id), {
        Gender: gender,
      })
        .then(() => {
          console.log("Woman gender updated");
        })
        .catch((error) => {
          console.log("Woman gender not updated : ", error);
        });

      navigation.navigate("WishedGender");
    } else {
      console.log("ID is undefined or null");
    }
  };


 // MAJ du gender other + navigation
 const otherClick = async () => {

  let gender = "other"

  if (id) {
    await updateDoc(doc(db, "users", id), {
      Gender: gender,
    })
      .then(() => {
        console.log("Woman gender updated");
      })
      .catch((error) => {
        console.log("Woman gender not updated : ", error);
      });

    navigation.navigate("WishedGender");
  } else {
    console.log("ID is undefined or null");
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
        COMMENT TU {"\n"}TE DÉFINIS ?
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
        onPress={() => manClick()}
        style={{
          backgroundColor: "#292929",
          width: "80%",
          height: 55,
          borderRadius: 13,
          paddingLeft: 17,
          paddingRight: 17,
          marginTop: 25,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontFamily: "Lexend_400Regular",
            fontSize: 18,
          }}
        >
          Homme
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => womanClick()}
        style={{
          backgroundColor: "#292929",
          width: "80%",
          height: 55,
          borderRadius: 13,
          paddingLeft: 17,
          paddingRight: 17,
          marginTop: 8,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontFamily: "Lexend_400Regular",
            fontSize: 18,
          }}
        >
          Femme
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => otherClick()}
        style={{
          backgroundColor: "#292929",
          width: "80%",
          height: 55,
          borderRadius: 13,
          paddingLeft: 17,
          paddingRight: 17,
          marginTop: 8,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontFamily: "Lexend_400Regular",
            fontSize: 18,
          }}
        >
          Autre
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create();
