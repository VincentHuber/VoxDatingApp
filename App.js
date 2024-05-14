import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './screens/LoginScreen';
import AudioScreen from './screens/signUpScreens/AudioScreen'
import CityScreen from './screens/signUpScreens/CityScreen'
import GenderScreen from './screens/signUpScreens/GenderScreen'
import WishedGenderScreen from './screens/signUpScreens/WishedGenderScreen'
import UsernameScreen from './screens/signUpScreens/UsernameScreen'
import AgeScreen from './screens/signUpScreens/AgeScreen';
import FeedScreen from './screens/TabScreens/FeedScreen';
import CrushScreen from './screens/TabScreens/CrushScreen';
import ChatScreen from './screens/TabScreens/ChatScreen';
import ProfilScreen from './screens/TabScreens/ProfilScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator()

const TabNavigator = () =>{
  return(
    <Tab.Navigator screenOptions = {{headerShown: false}}>
      <Tab.Screen name= "Feed" component = {FeedScreen}/>
      <Tab.Screen name = "Crush" component = {CrushScreen}/>
      <Tab.Screen name = "Chat" component = {ChatScreen}/>
      <Tab.Screen  name = "Profil" component = {ProfilScreen}/>
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen options ={{headerShown:false}} name="Login" component={LoginScreen} />
      <Stack.Screen  options ={{headerShown:false}} name="Username" component={UsernameScreen} />
      <Stack.Screen  options ={{headerShown:false}} name="Age" component={AgeScreen} />
      <Stack.Screen  options ={{headerShown:false}} name="Gender" component={GenderScreen} />
      <Stack.Screen  options ={{headerShown:false}} name="WishedGender" component={WishedGenderScreen} />
      <Stack.Screen  options ={{headerShown:false}} name="City" component={CityScreen} />
      <Stack.Screen  options ={{headerShown:false}} name="Audio" component={AudioScreen} />
      <Stack.Screen  options ={{headerShown:false}} name="TabNavigator" component={TabNavigator} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create();
