import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import AudioScreen from './screens/signUpScreens/AudioScreen'
import CityScreen from './screens/signUpScreens/CityScreen'
import GenderScreen from './screens/signUpScreens/GenderScreen'
import WishedGenderScreen from './screens/signUpScreens/WishedGenderScreen'
import UsernameScreen from './screens/signUpScreens/UsernameScreen'
import AgeScreen from './screens/signUpScreens/AgeScreen';

const Stack = createNativeStackNavigator();


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
      <Stack.Screen  options ={{headerShown:false}} name="Home" component={HomeScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create();
