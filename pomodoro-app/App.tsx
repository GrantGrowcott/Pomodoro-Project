import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./assets/redux/Store";
import Task from "./assets/components/task";
import TorusDisplay from "./assets/components/TorusDisplay";
import Timer from "./assets/components/timer";
import { styles } from "./assets/styles/styles";
import React from "react";
import { PomodoroSession } from "./backend/pomodoro";

export default function App() {
  const pomodoroSession = new PomodoroSession(25, 5, 15);
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Task />
        <Timer pomodoroSession={pomodoroSession} />
        <StatusBar style="auto" />
      </View>
      <View style={styles.canvasContainer}>
        <TorusDisplay />
      </View>
    </Provider>
  );
}
