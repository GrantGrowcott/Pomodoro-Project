import { View, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { styles } from "../styles/styles";
import Icon from "react-native-vector-icons/FontAwesome";
import { PomodoroSession, Session } from "../../backend/pomodoro";
import React from "react";

const secondsToMinutesString = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

enum PlayPauseButtonState {
  Initial = "Initial",
  Started = "Started",
  Paused = "Paused",
}

enum StopButtonState {
  Initial = "Initial",
  Started = "Started",
  Stopped = "Stopped",
}

const Timer = ({ pomodoroSession }: { pomodoroSession: PomodoroSession }) => {
  const [playPauseButtonState, setPlayPauseButtonState] = useState(
    PlayPauseButtonState.Initial
  );
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [sessionTime, setSessionTime] = useState(
    secondsToMinutesString(pomodoroSession.focusDurationSeconds)
  );

  function handlePlayPauseButton() {
    console.log(`Play/Pause button pressed`);
    if (playPauseButtonState === PlayPauseButtonState.Initial) {
      if (currentSession !== null && currentSession.type !== "focus") {
        // This is a break session. Pressing the play button should start a new focus session.
        console.log("Ending break session to start new focus session");
        pomodoroSession.endSession();
      }
      const session = pomodoroSession.startSession();
      setCurrentSession(session);
      setPlayPauseButtonState(PlayPauseButtonState.Started);
    } else if (playPauseButtonState === PlayPauseButtonState.Started) {
      if (!pomodoroSession.activeSession?.pausedOnce) {
        console.log(
          "Pausing session.",
          pomodoroSession.isActive,
          pomodoroSession.pomodoros
        );
        pomodoroSession.toggleSessionPause();
        setPlayPauseButtonState(PlayPauseButtonState.Paused);
      } else {
        console.log("Session already paused once");
      }
    } else if (playPauseButtonState === PlayPauseButtonState.Paused) {
      setPlayPauseButtonState(PlayPauseButtonState.Started);
      pomodoroSession.toggleSessionPause();
    }
  }

  function handleStopButton() {
    console.log(`Stop button pressed`);
    if (pomodoroSession.isActive) {
      if (pomodoroSession.activeSession === null) {
        throw new Error("Active session is null");
      }
      const sessionOrPomodoro = pomodoroSession.endSession();
      setPlayPauseButtonState(PlayPauseButtonState.Initial);
      if (sessionOrPomodoro instanceof Session) {
        setCurrentSession(sessionOrPomodoro);
        setSessionTime(
          secondsToMinutesString(sessionOrPomodoro.timeRemainingSeconds)
        );
      } else {
        setSessionTime(
          secondsToMinutesString(pomodoroSession.focusDurationSeconds)
        );
      }
    }
  }

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (currentSession !== null) {
      timer = setInterval(() => {
        if (pomodoroSession.activeSession !== null) {
          setSessionTime(
            secondsToMinutesString(currentSession.timeRemainingSeconds)
          );
        }
      }, 1000);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [playPauseButtonState, pomodoroSession.activeSession]);

  return (
    <View style={styles.container}>
      <View style={[styles.timerContainer, styles.timerMargin]}>
        <TouchableOpacity style={[styles.timeButton]}>
          <Text>{currentSession?.type ?? "focus"}</Text>
        </TouchableOpacity>
      </View>
      <Text>{sessionTime}</Text>
      <View style={styles.timerContainer}>
        <TouchableOpacity
          style={[styles.button, styles.startColor]}
          onPress={handlePlayPauseButton}
        >
          {
            {
              [PlayPauseButtonState.Initial]: (
                <Icon name="play" size={30} color="black" />
              ),
              [PlayPauseButtonState.Started]: (
                <Icon name="pause" size={30} color="black" />
              ),
              [PlayPauseButtonState.Paused]: (
                <Icon name="play" size={30} color="black" />
              ),
            }[playPauseButtonState]
          }
        </TouchableOpacity>
        <View style={styles.gap} />
        <TouchableOpacity
          style={[styles.button, styles.stopColor]}
          onPress={handleStopButton}
        >
          {currentSession === null || !currentSession.isActive ? (
            <Icon name="stop" size={30} color="gray" />
          ) : (
            <Icon name="stop" size={30} color="black" />
          )}
        </TouchableOpacity>
        <View style={styles.gap} />
        <TouchableOpacity style={[styles.button, styles.stopColor]}>
          <Icon name="refresh" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Timer;
