import { SafeAreaView, Text, View, Button, PanResponder, Dimensions } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import Candidate from "../../components/Candidate";
import Footer from "../../components/Footer";
import Animated from "react-native-reanimated";


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
import AsyncStorage from "@react-native-async-storage/async-storage";

const {width, height}=Dimensions.get("screen")


const FeedScreen = () => {

  //Valeur de l'id
  const [id, setId] = useState(null);

  const[userFiltered, setUserFiltered]= useState([])


  const swipe = useRef(new Animated.ValueXY()).current
  const titlSign = useRef(new Animated.Value(1)).current

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder : () => true,

    onPanResponderMove :(_, {dx, dy, y0})=> {
      swipe.setValue({x:dx, y:dy})
      titlSign.setValue(y0 > (height* .9)/2 ? 1 : -1)
    },
    onPanResponderRelease: (_, {dx, dy})=> {
      const direction = Math.sign(dx)
      const isActionActive = Math.abs(dx) > 100;

      if (isActionActive){
        Animated.timing(swipe,{
          duration : 100,
          toValue:{
            x: direction*500,
            y: dy
          },
          useNativeDriver:true
      }).start()
      }else{
        Animated.spring(swipe, {
          toValue:{
            x:0,
            y:0
          },
          useNativeDriver:true,
          friction:5
        }).start()
      }
    }
  })



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
        const usersData = []

        allUsers.forEach((user) => {
          const userObj = {
            username: user.data().username,
            gender: user.data().gender,
            audioProfile: user.data().audioProfile,
          };
          usersData.push(userObj)

        });
        setUserFiltered(usersData)

      } catch (error) {
        console.log("error fetching users : ", error);
      }
    };

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
    <SafeAreaView style={{ 
      flex: 1, 
      backgroundColor: "black",
      alignItems: "center" }}>

      {userFiltered.map(({ username, audioProfile }, index) => {
        const isFirst = index == 0
        const dragHandlers = isFirst ? panResponder.panHandlers : {}
        return (
          <Candidate
            key={index}
            username={username}
            audioProfile={audioProfile}
            isFirst={isFirst}
            swipe ={swipe}
            titlSign={titlSign}
            {...dragHandlers}
          />
        );
      }).reverse()
      }
      <Footer/>
    </SafeAreaView>
  );
};

export default FeedScreen;


