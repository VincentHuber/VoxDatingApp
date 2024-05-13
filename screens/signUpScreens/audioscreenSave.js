//Tuto expo-av : www.youtube.com/watch?v=UKB-0wimchU&t=57s

import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
  import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
  
  import { updateDoc, doc } from "firebase/firestore";
  import { db } from "../../firebase";
  
  import { Audio } from "expo-av";
  
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
  
  
  export default function AudioScreen({ navigation }) {
  
    //Etats des pour l'audio
    const [recording, setRecording] = useState();
    const [recordings, setRecordings] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
  
  
    //Valeur de l'id
    const [id, setId] = useState(null);
  
  
    //Fonction pour enregistrer l'audio
    async function startRecording() {
      try {
        setRecordings([]);
        const perm = await Audio.requestPermissionsAsync();
  
        if (perm.status === "granted") {
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
          });
  
          const { recording } = await Audio.Recording.createAsync(
            Audio.RecordingOptionsPresets.HIGH_QUALITY
          );
          setRecording(recording);
        }
      } catch (error) {
        console.log("Reccording error :", error);
      }
    }
  
    //Fonction pour arrêter l'enregistrement
    async function stopRecording() {
      setRecording(null);
  
      await recording.stopAndUnloadAsync();
      let allRecordings = [...recordings];
      //permet de jouer le son sur le haut-parleur
      await Audio.setAudioModeAsync({ 
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        
      });
      const { sound, status } = await recording.createNewLoadedSoundAsync();
      
      allRecordings.push({
        sound: sound,
        duration: getDurationFormatted(status.durationMillis),
        file: recording.getURI(),
      });
  
      setRecordings(allRecordings);
      console.log("1 recordings : ", recordings)
    }
  
    //Fonction pour jouer l'audio
    async function playRecording() {
      console.log("2 recordings : ", recordings)
      setIsPlaying(true);
      const { sound } = recordings[0];
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setIsPlaying(false);
        }
      });
      await sound.replayAsync();
    }
  
    //Fonction pour formater la durée
    function getDurationFormatted(milliseconds) {
      const minutes = milliseconds / 1000 / 60;
      const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
      return seconds < 10
        ? `${Math.floor(minutes)}:0${seconds}`
        : `${Math.floor(minutes)}:${seconds}`;
    }
  
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
  
    // if (id) {
    //   await updateDoc(doc(db, "users", id), {
    //     Gender: gender,
    //   })
    //     .then(() => {
    //       console.log("Woman gender updated");
    //     })
    //     .catch((error) => {
    //       console.log("Woman gender not updated : ", error);
    //     });
  
    //   navigation.navigate("WishedGender");
  
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
          justifyContent: "space-between",
          backgroundColor: "black",
        }}
      >
        <View
          style={{
            width: "80%",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              marginTop: 25,
  
              textAlign: "center",
              fontFamily: "Lexend_900Black",
              fontSize: 34,
              color: "white",
            }}
          >
            PRÉSENTE-TOI
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
            Ta voix est ton unique moyen de séduire. 5 sec ou 2 min, c'est comme
            tu sens !
          </Text>
        </View>
  
        <TouchableOpacity
          onPress={recording ? stopRecording : startRecording}
          style={{
            width: "47%",
            aspectRatio: 1,
            borderRadius: 400,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "white",
            backgroundColor: "black",
          }}
        >
          {recording ? (
            <FontAwesome5 name="stop" size={40} color="white" />
          ) : (
            <MaterialCommunityIcons
              name="microphone"
              size={70}
              color="white"
            />
          )}
        </TouchableOpacity>
  
        <View
          style={{
            flexDirection: "row",
            width: "80%",
            justifyContent: "space-around",
            marginBottom: 30,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              height: 55,
              width: 55,
              borderColor: "white",
              borderWidth: 1,
              borderRadius: 14,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={startRecording}
              disabled={recordings.length === 0 }
            >
              <FontAwesome5
                name="redo-alt"
                size={24}
                color={recordings.length === 0 ? "#383838" : "white"}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: 120,
              borderColor: "white",
              borderWidth: 1,
              borderRadius: 14,
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={playRecording}
              disabled={recordings.length === 0 || isPlaying}
            >
              <FontAwesome5
                name="play"
                size={24}
                color={recordings.length === 0 || isPlaying ? "#383838" : "white"}
              />
            </TouchableOpacity>
  
            <TouchableOpacity
              onPress={() => recordings[0].sound.pauseAsync()}
              disabled={recordings.length === 0}
            >
              <FontAwesome5
                name="pause"
                size={24}
                color={recordings.length === 0 ? "#383838" : "white"}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              height: 55,
              width: 55,
              borderRadius: 14,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
            }}
            disabled={recordings.length === 0}
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


//   ----> test 2 <-----

//Tuto expo-av : www.youtube.com/watch?v=UKB-0wimchU&t=57s

import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
  import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
  
  import { updateDoc, doc } from "firebase/firestore";
  import { db } from "../../firebase";
  
  import { Audio } from "expo-av";
  
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
  
  
  export default function AudioScreen({ navigation }) {
  
    //Etats des pour l'audio
    const [recording, setRecording] = useState();
    const [recordings, setRecordings] = useState();
    const [isPlaying, setIsPlaying] = useState(false);
  
  
    //Valeur de l'id
    const [id, setId] = useState(null);
  
  
    //Fonction pour enregistrer l'audio
    async function startRecording() {
      try {
        setRecordings(null);
        const perm = await Audio.requestPermissionsAsync();
  
        if (perm.status === "granted") {
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
          });
  
          const { recording } = await Audio.Recording.createAsync(
            Audio.RecordingOptionsPresets.HIGH_QUALITY
          );
          setRecording(recording);
        }
      } catch (error) {
        console.log("Reccording error :", error);
      }
    }
  
    //Fonction pour arrêter l'enregistrement
    async function stopRecording() {
      setRecording(null);
  
      await recording.stopAndUnloadAsync();
      
      //permet de jouer le son sur le haut-parleur
      await Audio.setAudioModeAsync({ 
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        
      });
      const { sound, status } = await recording.createNewLoadedSoundAsync();
      
      setRecordings({
        sound: sound,
        duration: getDurationFormatted(status.durationMillis),
        file: recording.getURI(),
      });
    }
  
    //Fonction pour jouer l'audio
    async function playRecording() {
      console.log("recordings : ", recordings)
      setIsPlaying(true);
      const { sound } = recordings;
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setIsPlaying(false);
        }
      });
      await sound.replayAsync();
    }
  
  
    // Fonction pour mettre en pause
    async function pauseRecording() {
      setIsPlaying(false);
      await recordings.sound.pauseAsync();
    }
  
  
    //Fonction pour formater la durée
    function getDurationFormatted(milliseconds) {
      const minutes = milliseconds / 1000 / 60;
      const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
      return seconds < 10
        ? `${Math.floor(minutes)}:0${seconds}`
        : `${Math.floor(minutes)}:${seconds}`;
    }
  
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
  
    // if (id) {
    //   await updateDoc(doc(db, "users", id), {
    //     Gender: gender,
    //   })
    //     .then(() => {
    //       console.log("Woman gender updated");
    //     })
    //     .catch((error) => {
    //       console.log("Woman gender not updated : ", error);
    //     });
  
    //   navigation.navigate("WishedGender");
  
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
          justifyContent: "space-between",
          backgroundColor: "black",
        }}
      >
        <View
          style={{
            width: "80%",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              marginTop: 25,
  
              textAlign: "center",
              fontFamily: "Lexend_900Black",
              fontSize: 34,
              color: "white",
            }}
          >
            PRÉSENTE-TOI
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
            Ta voix est ton unique moyen de séduire. 5 sec ou 2 min, c'est comme
            tu sens !
          </Text>
        </View>
  
        <TouchableOpacity
          onPress={recording ? stopRecording : startRecording}
          style={{
            width: "47%",
            aspectRatio: 1,
            borderRadius: 400,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "white",
            backgroundColor: "black",
          }}
        >
          {recording ? (
            <FontAwesome5 name="stop" size={40} color="white" />
          ) : (
            <MaterialCommunityIcons
              name="microphone"
              size={70}
              color="white"
            />
          )}
        </TouchableOpacity>
  
        <View
          style={{
            flexDirection: "row",
            width: "80%",
            justifyContent: "space-around",
            marginBottom: 30,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              height: 55,
              width: 55,
              borderColor: "white",
              borderWidth: 1,
              borderRadius: 14,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={startRecording}
              disabled={!recordings }
            >
              <FontAwesome5
                name="redo-alt"
                size={24}
                color={!recordings ? "#383838" : "white"}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: 120,
              borderColor: "white",
              borderWidth: 1,
              borderRadius: 14,
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={playRecording}
              disabled={!recordings  || isPlaying}
            >
              <FontAwesome5
                name="play"
                size={24}
                color={!recordings  || isPlaying ? "#383838" : "white"}
              />
            </TouchableOpacity>
  
            <TouchableOpacity
              onPress={pauseRecording}
              disabled={!recordings }
            >
              <FontAwesome5
                name="pause"
                size={24}
                color={!recordings  ? "#383838" : "white"}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              height: 55,
              width: 55,
              borderRadius: 14,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
            }}
            disabled={!recordings }
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



//   -----> SAVE2 <-----
  //Tuto expo-av : www.youtube.com/watch?v=UKB-0wimchU&t=57s

import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
  import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
  
  import  {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"
  import { updateDoc, doc, addDoc, collection, onSnapshot } from "firebase/firestore";
  import { db } from "../../firebase";
  import { storage } from "../../firebase";
  
  import { Audio } from "expo-av";
  
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
  import firebase from "firebase/compat/app";
  
  
  export default function AudioScreen({ navigation }) {
  
    //Etats des pour l'audio
    const [recordingInProgress, setRecordingInProgress] = useState();
    const [recordingDone, setRecordingDone] = useState();
    const [isPlaying, setIsPlaying] = useState(false);
  
    const[progress, setProgress]= useState()
  
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
  
  
    //Fonction pour enregistrer l'audio
    async function startRecording() {
      try {
        setRecordingDone(null);
        const perm = await Audio.requestPermissionsAsync();
  
        if (perm.status === "granted") {
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
          });
  
          
          const { recording } = await Audio.Recording.createAsync(
            Audio.RecordingOptionsPresets.HIGH_QUALITY
          );
          setRecordingInProgress(recording);
        }
      } catch (error) {
        console.log("Reccording error :", error);
      }
    }
  
    //Fonction pour arrêter l'enregistrement
    async function stopRecording() {
      setRecordingInProgress(null);
  
      await recordingInProgress.stopAndUnloadAsync();
      
      //autorise le son sur le haut-parleur
      await Audio.setAudioModeAsync({ 
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        
      });
      const { sound, status } = await recordingInProgress.createNewLoadedSoundAsync();
      
      setRecordingDone({
        sound: sound,
        duration: getDurationFormatted(status.durationMillis),
        file: recordingInProgress.getURI(),
      });
  
      //Joue l'audio après l'avoir enregistré
      setIsPlaying(true);
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setIsPlaying(false);
        }
      });
      await sound.replayAsync();
    }
  
    //Fonction pour jouer l'audio
    async function playRecording() {
      console.log("recording2 : ", recordingDone.file)
      setIsPlaying(true);
      const { sound } = recordingDone;
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setIsPlaying(false);
        }
      });
      await sound.replayAsync();
    }
  
  
    // Fonction pour mettre en pause
    async function pauseRecording() {
      setIsPlaying(false);
      await recordingDone.sound.pauseAsync();
    }
  
  
    //Fonction pour formater la durée
    function getDurationFormatted(milliseconds) {
      const minutes = milliseconds / 1000 / 60;
      const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
      return seconds < 10
        ? `${Math.floor(minutes)}:0${seconds}`
        : `${Math.floor(minutes)}:${seconds}`;
    }
  
  
    //Fonction pour enregistrer l'audio dans Firestore
  async function audioFirestoreUpdate(uri, fileType) {
    const response = await fetch(uri);
    const blob = await response.blob()
  
    const storageRef = ref(storage, "audioProfile/" + new Date().getTime())
    const uploadTask = uploadBytesResumable(storageRef, blob)
  
    uploadTask.on("state_changed", 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100
        console.log('progress : ', progress)
        setProgress(progress.toFixed())
      }, 
      (error)=>{
        console.log("error : ", error)
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL)=>{
          console.log("downloadURL : ", downloadURL)
          setRecordingDone("")
  
          // if (id) {
          //   await updateDoc(doc(db, "users", id), {
          //     audioProfile: downloadURL,
          //   })
          //     .then(() => {
          //       console.log("Woman gender updated");
          //     })
          //     .catch((error) => {
          //       console.log("Woman gender not updated : ", error);
          //     })}
  
  
        })      
      }
    )
    
  }
  
  
  
  
  
  
    
  
  
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
          justifyContent: "space-between",
          backgroundColor: "black",
        }}
      >
        <View
          style={{
            width: "80%",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              marginTop: 25,
  
              textAlign: "center",
              fontFamily: "Lexend_900Black",
              fontSize: 34,
              color: "white",
            }}
          >
            PRÉSENTE-TOI
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
            Ta voix est ton unique moyen de séduire. 5 sec ou 2 min, c'est comme
            tu sens !
          </Text>
        </View>
  
        <TouchableOpacity
          onPress={recordingInProgress ? stopRecording : startRecording}
          style={{
            width: "47%",
            aspectRatio: 1,
            borderRadius: 400,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "white",
            backgroundColor: "black",
          }}
        >
          {recordingInProgress ? (
            <FontAwesome5 name="stop" size={40} color="white" />
          ) : (
            <MaterialCommunityIcons
              name="microphone"
              size={70}
              color="white"
            />
          )}
        </TouchableOpacity>
  
        <View
          style={{
            flexDirection: "row",
            width: "80%",
            justifyContent: "space-around",
            marginBottom: 30,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              height: 55,
              width: 55,
              borderColor: "white",
              borderWidth: 1,
              borderRadius: 14,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={startRecording}
              disabled={!recordingDone }
            >
              <FontAwesome5
                name="redo-alt"
                size={24}
                color={!recordingDone ? "#383838" : "white"}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: 120,
              borderColor: "white",
              borderWidth: 1,
              borderRadius: 14,
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={playRecording}
              disabled={!recordingDone  || isPlaying}
            >
              <FontAwesome5
                name="play"
                size={24}
                color={!recordingDone  || isPlaying ? "#383838" : "white"}
              />
            </TouchableOpacity>
  
            <TouchableOpacity
              onPress={pauseRecording}
              disabled={!recordingDone }
            >
              <FontAwesome5
                name="pause"
                size={24}
                color={!recordingDone  ? "#383838" : "white"}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => recordingDone && audioFirestoreUpdate(recordingDone.file, "audio")}
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
  
  const styles = StyleSheet.create()
  