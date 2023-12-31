import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { store } from "../pomodoro-app/redux/Store";
import Home from "./components/Home";
import Header from "./components/Header";
import Notes from "./components/Notes";
import {
  OpenSans_800ExtraBold_Italic,
  useFonts,
} from "@expo-google-fonts/open-sans";

export default function App() {
  const [fontsLoaded] = useFonts({
    OpenSans_800ExtraBold_Italic,
  });

  if (!fontsLoaded) {
    return null;
  }

  const RootStack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName="Home"
          screenOptions={{
            header: () => <Header />,
            animation: "none",
          }}
        >
          <RootStack.Screen name="Home" component={Home} />
          <RootStack.Screen name="Notes" component={Notes} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
