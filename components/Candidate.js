import { Text, View, SafeAreaView } from "react-native";
import React, { Fragment } from "react";
import Choice from "./Choice";

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

const Candidate = ({ username, audioProfile, isFirst }) => {
  const renderChoice = () => {
    return (
      <Fragment>
        <View
          style={{
            position: "absolute",
            top: 100,
            left: 45,
            transform: [{ rotate: "-30deg" }],
          }}
        >
          <Choice type="like" />
        </View>
        <View
          style={{
            position: "absolute",
            top: 100,
            right: 45,
            transform: [{ rotate: "30deg" }],
          }}
        >
          <Choice type="nope" />
        </View>
      </Fragment>
    );
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
        position: "absolute",
        backgroundColor: "black",
        width: "100%",
        height: "100%",
        borderRadius: 15,
        alignItems: "center",
        // borderColor:"red",
        // borderWidth:1
      }}
    >
      <Text
        style={{
          marginTop: 50,
          fontFamily: "Lexend_200ExtraLight",
          letterSpacing: 2,
          color: "white",
          fontSize: 40,
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        {username}
      </Text>
      <Text
        style={{
          color: "white",
          marginTop: 200,
          fontSize: 10,
          width: 200,
          textAlign: "center",
        }}
      >
        {audioProfile}
      </Text>
      {isFirst && renderChoice()}
    </SafeAreaView>
  );
};

export default Candidate;
