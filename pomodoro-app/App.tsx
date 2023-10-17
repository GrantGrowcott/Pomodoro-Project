import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./components/Home";
import Header from "./components/Header";
import Notes from "./components/Notes";
import { OpenSans_800ExtraBold_Italic, useFonts } from '@expo-google-fonts/open-sans';


const Stack = createNativeStackNavigator();

export default function App() {

  const [fontsLoaded] = useFonts({
    OpenSans_800ExtraBold_Italic,
  });


 if (!fontsLoaded) {
  return null
}
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{animation: "none"}}>
        <Stack.Screen name="Home"
          component={Home}
          options={{
            header: () => <Header />,
            animation: "none"
          }} />
          <Stack.Screen name="Notes"
          component={Notes}
          options={{
            header: () => <Header />,
            animation: "none"
          }} />
      </Stack.Navigator> 
    </NavigationContainer>
    
  );
}
