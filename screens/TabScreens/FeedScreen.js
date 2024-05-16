import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase';
import { collection, get, doc, getDocs } from 'firebase/firestore';

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
import AsyncStorage from '@react-native-async-storage/async-storage';


const FeedScreen = () => {

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


  //Récupère toutes les données des users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getDocs(collection(db, "users"));
        
        allUsers.forEach((doc) => {
          console.log("Users : ", doc.id, " => ", doc.data());
        });
      } catch (error) {
        console.log("error fetching users : ", error);
      }
    }
  
    fetchUsers();
  }, []);




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
    
    <SafeAreaView style={{flex:1, backgroundColor:"black"}}>
      <Text style={{color:"white"}}>FeedScreen</Text>
    </SafeAreaView>
 
  )
}

export default FeedScreen

const styles = StyleSheet.create({})