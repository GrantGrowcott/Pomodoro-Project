import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import Task from "./assets/components/task";
import Tree from "./assets/components/tree";
import Timer from "./assets/components/timer";
import { styles } from "./assets/styles/styles";
import React from "react";
import { PomodoroSession } from "./backend/pomodoro";

export default function App() {
  const pomodoroSession = new PomodoroSession(25, 5, 15);
  return (
    <View style={styles.container}>
      <Task />
      <Tree />
      <Timer pomodoroSession={pomodoroSession} />
      <StatusBar style="auto" />
    </View>
  );
}
