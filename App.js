import { StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./screens/LoginScreen";
import AudioScreen from "./screens/signUpScreens/AudioScreen";
import CityScreen from "./screens/signUpScreens/CityScreen";
import GenderScreen from "./screens/signUpScreens/GenderScreen";
import WishedGenderScreen from "./screens/signUpScreens/WishedGenderScreen";
import UsernameScreen from "./screens/signUpScreens/UsernameScreen";
import AgeScreen from "./screens/signUpScreens/AgeScreen";
import FeedScreen from "./screens/TabScreens/FeedScreen";
import LikesScreen from "./screens/TabScreens/LikesScreen";
import ChatScreen from "./screens/TabScreens/ChatScreen";
import ProfilScreen from "./screens/TabScreens/ProfilScreen";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { BlurView } from "expo-blur";

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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//Glassmorphisme
const MenuBlur = () => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 17,
          overflow: "hidden",
        }}
      >
        <BlurView
          intensity={12}
          style={{ flex: 1, backgroundColor: " rgba(255, 255, 255, 0.1)" }}
        />
      </View>
    </View>
  );
};

//Tab Navigation
const TabNavigator = () => {
  return (
    <Tab.Navigator
      safeAreaInsets={{
        bottom: 0,
        top: 100,
      }}
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarBackground: () => <MenuBlur />,
        tabBarStyle: {
          position: "absolute",
          bottom: 30,
          width: 344,
          elevation: 0,
          borderRadius: 17,
          paddingHorizontal: 3,
          height: 90,
          left: "50%",
          transform: [{ translateX: -172 }],
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 80,
                height: 80,
                borderRadius: 12,
                backgroundColor: focused ? "white" : "",
              }}
            >
              <MaterialIcons
                name="multitrack-audio"
                size={30}
                color={focused ? "black" : "white"}
              />
              <Text
                style={{
                  fontFamily: "Lexend_400Regular",
                  letterSpacing: 1,
                  fontSize: 14,
                  marginTop: 8,
                  color: focused ? "black" : "white",
                }}
              >
                FEED
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Likes"
        component={LikesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 80,
                height: 80,
                borderRadius: 12,
                backgroundColor: focused ? "white" : "",
              }}
            >
              <Feather
                name="heart"
                size={30}
                color={focused ? "black" : "white"}
              />
              <Text
                style={{
                  fontFamily: "Lexend_400Regular",
                  letterSpacing: 1,
                  fontSize: 14,
                  marginTop: 8,
                  color: focused ? "black" : "white",
                }}
              >
                LIKES
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 80,
                height: 80,
                borderRadius: 12,
                backgroundColor: focused ? "white" : "",
              }}
            >
              <Ionicons
                name="chatbubbles-outline"
                size={32}
                color={focused ? "black" : "white"}
              />
              <Text
                style={{
                  fontFamily: "Lexend_400Regular",
                  letterSpacing: 1,
                  fontSize: 14,
                  marginTop: 8,
                  color: focused ? "black" : "white",
                }}
              >
                CHAT
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profil"
        component={ProfilScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 80,
                height: 80,
                borderRadius: 12,
                backgroundColor: focused ? "white" : "",
              }}
            >
              <FontAwesome5
                name="user"
                size={30}
                color={focused ? "black" : "white"}
              />

              <Text
                style={{
                  fontFamily: "Lexend_400Regular",
                  letterSpacing: 1,
                  fontSize: 14,
                  marginTop: 8,
                  color: focused ? "black" : "white",
                }}
              >
                PROFIL
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
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

  // //Attente de le chargement de la police
  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Username"
          component={UsernameScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Age"
          component={AgeScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Gender"
          component={GenderScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="WishedGender"
          component={WishedGenderScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="City"
          component={CityScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Audio"
          component={AudioScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="TabNavigator"
          component={TabNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create();
