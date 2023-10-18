import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { styles } from "../styles/styles";
import Icon from "react-native-vector-icons/FontAwesome";
import { arcIncrement, arcReset } from "../assets/redux/slices/TorusArc_Slice";
import { increaseCompleted } from "../assets/redux/slices/Pomodoro_Slice";
import { useAppSelector } from "../assets/redux/useApp";
import React from "react";
import useInterval from "../backend/useInterval";

enum PlayPauseButtonState {
  Started = "Started",
  Paused = "Paused",
}

interface Interval {
  init: Function;
  stop: Function;
  callback: Function;
}

interface Durations {
  focus: number;
  short: number;
  long: number;
}

interface SessionPrep {
  focus: Function;
  short: Function;
  long: Function;
}

const secondsToMinutesString = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const Timer = () => {
  // Button States
  const [playPauseButtonState, setPlayPauseButtonState] =
    useState<PlayPauseButtonState>(PlayPauseButtonState.Paused);

  // Checks the flags sessionActive and sessionPaused to provide the user an accurate <Text /> feedback
  const feedbackCheck = (sessionType: string) => {
    if (!sessionActive && !sessionPaused) return "session not started";
    if (sessionActive && sessionPaused) return "session paused";
    if (sessionActive && !sessionPaused) return sessionType;
  };

  // Pulling the customizable timers from Store
  const durations: Durations = {
    focus: useAppSelector((state) => state.session.duration[0] * 60),
    short: useAppSelector((state) => state.session.duration[1] * 60),
    long: useAppSelector((state) => state.session.duration[2] * 60),
  };

  // Session States
  const [sessionCtrl, setSessionCtrl] = useState<number>(0); // Helps defining what type of session the user is currently on | 0 = focus, 1 = short, 2 = long
  const [sessionTime, setSessionTime] = useState<number>(durations.focus); // Current session time in seconds - taken from Session_Slice and whatever value has in that moment
  const [sessionType, setSessionType] = useState<string>("focus"); // Current Session Type
  const [sessionConsecutive, setSessionConsecutive] = useState<number>(0);
  const [sessionActive, setSessionActive] = useState<boolean>(false); // Provides feedback if a session is currently running or not
  const [sessionPaused, setSessionPaused] = useState<boolean>(false); // Provides feedback if a session is paused or not

  // This object helps setting up states both in Timer and Redux slices in each type of session
  const sessionPrep: SessionPrep = {
    focus: () => {
      intervals.stop();
      setSessionTime(durations.focus);
      setSessionType("focus");
      setPlayPauseButtonState(PlayPauseButtonState.Paused);
      setSessionCtrl(0);
    },
    short: () => {
      intervals.stop();
      setPlayPauseButtonState(PlayPauseButtonState.Paused);
      dispatch(increaseCompleted());
      dispatch(arcIncrement());
      setSessionConsecutive(sessionConsecutive + 1);
      setSessionTime(durations.short);
      setSessionType("short break");
      setSessionCtrl(1);
    },
    long: () => {
      intervals.stop();
      setPlayPauseButtonState(PlayPauseButtonState.Paused);
      dispatch(arcReset);
      setSessionConsecutive(0);
      setSessionTime(durations.long);
      setSessionType("long break");
      setSessionCtrl(2);
    },
  };

  // Delay State (useIntervals)
  const [delay, setDelay] = useState<number | null>(null);
  const dispatch = useDispatch();

  // Interval settings - time between callbacks, stop, and what it does.
  const intervals: Interval = {
    init: () => {
      setDelay(1000); // Sets useInterval delay - defaulting at 1s (1000ms)
    },
    stop: () => {
      setDelay(null); // Stops useInterval with a null delay
    },
    callback: () => {
      // Time is running fellas
      if (sessionTime != 0) {
        setSessionTime(sessionTime - 1);
      }

      // Time is up!
      if (sessionTime <= 0 || sessionTime == 0) {
        switch (sessionCtrl) {
          case 0: // End of Pomodoro
            dispatch(increaseCompleted()); // +1 Pomodoros completed

            // If 4 consecutive Pomodoros have NOT been completed...
            if (sessionConsecutive != 4) sessionPrep.short();
            // If 4 consecutive Pomodoros have been completed...
            if (sessionConsecutive == 4) sessionPrep.long();
            break;
          case 1: // End of Short Break
            sessionPrep.focus();
            break;
          case 2: // End of Long Break
            sessionPrep.focus();
            break;
        }
      }
    },
  };

  // useInterval call here
  useInterval(intervals.callback, delay);

  // Start Button onPress Handler
  const handlePlayPauseButton = () => {
    console.log(`Play/Pause button pressed`);
    if (playPauseButtonState === PlayPauseButtonState.Paused) {
      intervals.init();
      setPlayPauseButtonState(PlayPauseButtonState.Started);
      setSessionActive(true);
      setSessionPaused(false);
    }

    if (playPauseButtonState === PlayPauseButtonState.Started) {
      intervals.stop();
      setPlayPauseButtonState(PlayPauseButtonState.Paused);
      setSessionActive(true);
      setSessionPaused(true);
    }
  };

  // Stop Button onPress Handler
  const handleStopButton = () => {
    intervals.stop();
    switch (sessionCtrl) {
      case 0:
        setSessionTime(durations.focus);
        break;
      case 1:
        setSessionTime(durations.short);
        break;
      case 2:
        setSessionTime(durations.long);
        break;
    }
    setPlayPauseButtonState(PlayPauseButtonState.Paused);
    setSessionActive(false);
    setSessionPaused(false);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.timerContainer]}>
        <TouchableOpacity style={[styles.timeButton]}>
          <Text style={{ textTransform: "capitalize" }}>
            {feedbackCheck(sessionType)}
          </Text>
        </TouchableOpacity>
      </View>
      <Text>{secondsToMinutesString(sessionTime)}</Text>
      <View style={styles.timerContainer}>
        {/* Play/Pause button */}
        <TouchableOpacity
          style={[styles.button, styles.startColor]}
          onPress={handlePlayPauseButton}
        >
          {
            {
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

        {/* Stop button */}
        <TouchableOpacity
          style={[styles.button, styles.stopColor]}
          onPress={handleStopButton}
        >
          <Icon name="stop" size={30} color="black" />
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
