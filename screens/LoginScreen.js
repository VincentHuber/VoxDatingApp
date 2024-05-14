import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  useWindowDimensions,
} from "react-native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
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
import BottomSheet from "@gorhom/bottom-sheet";
import React, { useEffect, useRef, useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setDoc, doc } from "firebase/firestore";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/core";
import { db } from "../firebase";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const LoginScreen = () => {

  //Calcul la taille de la police par rapport à sa View parente
  const windowWidth = useWindowDimensions().width;
  const fontSize = windowWidth * 0.116;

  //Etats pour se loguer
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [stateSignup, setStateSignup] = useState("");

  //Initialisation de la BottomSheet
  const sheetRef = useRef(null);
  const [isOpen, setIsOpen] = useState(-1);
  const snapPoints = [275];

  //Fonction pour activer la BottomSheet Signup
  const handleBottomSheetSignup = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
    setIsOpen(0);
    setStateSignup(true);
  }, []);

  //Fonction pour activer la BottomSheet Signin
  const handleBottomSheetSignin = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
    setIsOpen(0);
    setStateSignup(false);
  }, []);

  // Initialisation de useNavigation
  const navigation = useNavigation();

  //Hook pour rediriger vers Username si on est connecté
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       navigation.navigate("Username");
  //     }
  //   });
  //   return unsubscribe;
  // }, []);

  //Fonction pour s'inscrire
  const handleSignup = async () => {
    //Alerte si le mot de passe est trop court
    if (password.length < 6) {
      Alert.alert(
        "Mot de passe incorrect",
        "Vous devez rentrer au moins 6 caractères/chiffres."
      );
      return;
    }

    const auth = getAuth();

    try {
      // Création d'un user dans firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Stockage des informations user dans AsyncStorage
      await AsyncStorage.setItem("@user", JSON.stringify(user));

      //Création d'un user dans firestore
      await setDoc(
        doc(db, "users", user.uid),
        {
          email: user.email,
          token: user.stsTokenManager.accessToken,
        },
        { merge: true }
      );
      navigation.navigate("Username")
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error during signup:", errorCode, errorMessage);
    }
  };

  //Fonction pour se connecter
  const handleLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate("TabNavigator")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error during signin:", errorCode, errorMessage);
      });
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

  //Attend le chargement de la police
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <KeyboardAvoidingView
        style={{
          width: "100%",
          height: "100%",
        }}
        behavior="padding"
      >
        <GestureHandlerRootView
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
          }}
        >
          <Text
            style={{
              fontSize: 35,
              fontFamily: "Lexend_200ExtraLight",
              textAlign: "center",
              color: "white",
            }}
          >
            V O X
          </Text>

          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              width: "80%",
            }}
          >
            <Text
              style={{
                width: "100%",
                fontSize: fontSize,
                fontFamily: "Lexend_800ExtraBold",
                textAlign: "center",
                color: "white",
              }}
            >
              ÉCOUTE,{"\n"}
              CRUSH,{"\n"}
              RENCONTRE.
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => handleBottomSheetSignin(0)}
            style={{
              borderWidth: 1,
              borderColor: "white",
              width: "80%",
              height: 50,
              justifyContent: "center",
              borderRadius: 13,
              alignItems: "center",
              marginTop: 5,
            }}
          >
            <Text
              style={{
                color: "white",
                fontFamily: "Lexend_400Regular",
                fontSize: 18,
              }}
            >
              Se connecter
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleBottomSheetSignup(0)}
            style={{
              backgroundColor: "white",
              width: "80%",
              height: 50,
              justifyContent: "center",
              borderRadius: 13,
              alignItems: "center",
              marginTop: 5,
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                color: "black",
                fontFamily: "Lexend_400Regular",
                fontSize: 18,
              }}
            >
              S'inscrire
            </Text>
          </TouchableOpacity>

          <BottomSheet
            backgroundStyle={{ backgroundColor: "#292929" }}
            handleIndicatorStyle={{ backgroundColor: "#292929" }}
            ref={sheetRef}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            onClose={() => setIsOpen(-1)}
            index={isOpen}
          >
            <View
              style={{
                width: "100%",
                height: "100%",
                alignItems: "center",
                backgroundColor: "#292929",
              }}
            >
              <Text
                style={{
                  marginTop: 5,
                  textAlign: "center",
                  color: "white",
                  fontFamily: "Lexend_700Bold",
                  fontSize: 30,
                }}
              >
                {stateSignup ? "INSCRIPTION" : "CONNEXION"}
              </Text>
              <TextInput
                placeholder="Email"
                placeholderTextColor={"#808080"}
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={{
                  width: "80%",
                  height: 50,
                  backgroundColor: "black",
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
              <TextInput
                placeholder="Mot de passe"
                placeholderTextColor={"#808080"}
                value={password}
                onChangeText={(text) => setPassword(text)}
                style={{
                  width: "80%",
                  height: 50,
                  backgroundColor: "black",
                  borderRadius: 13,
                  paddingLeft: 17,
                  paddingRight: 17,
                  marginTop: 5,

                  textAlign: "center",
                  color: "white",
                  fontFamily: "Lexend_400Regular",
                  fontSize: 18,
                }}
                secureTextEntry
              />

              <View
                style={{
                  width: "80%",
                  marginTop: 10,
                  alignItems: "flex-end",
                }}
              >
                <TouchableOpacity
                  onPress={stateSignup ? handleSignup : handleLogin}
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
                    source={require("../assets/arrow.png")}
                    style={{
                      width: 16,
                      height: 22,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </BottomSheet>
        </GestureHandlerRootView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
