import { View, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../redux/useApp";
import { styles } from "../styles/styles";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  arcReset,
  arcIncrement,
  arcSkip,
} from "../redux/slices/TorusArc_Slice";
import { increaseCompleted } from "../redux/slices/Pomodoro_Slice";
import { useAppSelector } from "../redux/useApp";
import React from "react";
import useInterval from "../backend/useInterval";
import { iconSize } from "../constants";
import { colors } from "../constants";

enum PlayPauseButtonState {
  Started = "Started",
  Paused = "Paused",
}

interface Interval {
  init: () => void;
  stop: () => void;
  callback: () => void;
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
  const timers = useAppSelector((state) => state.session.duration);

  const durations: Durations = {
    focus: timers[0] * 60,
    short: timers[1] * 60,
    long: timers[2] * 60,
  };

  // Session States
  const [sessionCtrl, setSessionCtrl] = useState<number>(0); // Helps defining what type of session the user is currently on | 0 = focus, 1 = short, 2 = long
  const [sessionTime, setSessionTime] = useState<number>(durations.focus); // Current session time in seconds
  const [sessionType, setSessionType] = useState<string>("focus"); // Current Session Type
  const [sessionRound, setSessionRound] = useState<number>(1); // Round = Focus Session
  const [sessionActive, setSessionActive] = useState<boolean>(false); // Provides feedback if a session is currently running or not
  const [sessionPaused, setSessionPaused] = useState<boolean>(false); // Provides feedback if a session is paused or not

  // useEffect to modify states on demand when timers are customized
  useEffect(() => {
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
  }, [durations.focus, durations.short, durations.long]);

  // This object helps setting up states both in Timer and Redux slices in each type of session
  const sessionPrep: SessionPrep = {
    focus: () => {
      intervals.stop();
      setSessionRound(sessionRound + 1);
      setSessionTime(durations.focus);
      setSessionType("focus");
      setPlayPauseButtonState(PlayPauseButtonState.Paused);
      setSessionCtrl(0);
    },
    short: () => {
      intervals.stop();
      setPlayPauseButtonState(PlayPauseButtonState.Paused);
      dispatch(increaseCompleted());
      setSessionTime(durations.short);
      setSessionType("short break");
      setSessionCtrl(1);
    },
    long: () => {
      intervals.stop();
      setPlayPauseButtonState(PlayPauseButtonState.Paused);
      setSessionTime(durations.long);
      setSessionType("long break");
      setSessionCtrl(2);
    },
  };

  // Delay State (useIntervals)
  const [delay, setDelay] = useState<number | null>(null);
  const dispatch = useAppDispatch();

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
      if (sessionTime !== 0) {
        setSessionTime(sessionTime - 1);

        if (sessionCtrl === 0) dispatch(arcIncrement()); // Increasing the Torus!
      }

      // Time is up!
      if (sessionTime <= 0 || sessionTime === 0) {
        switch (sessionCtrl) {
          case 0: // End of a Pomodoro
            dispatch(increaseCompleted()); // +1 Pomodoros completed
            // If 4 Round/Pomodoros have NOT been completed...
            if (sessionRound !== 4) sessionPrep.short();
            // If 4 Round/Pomodoros have been completed...
            if (sessionRound === 4) sessionPrep.long();
            break;
          case 1: // End of Short Break
            sessionPrep.focus();
            dispatch(arcReset());
            break;
          case 2: // End of Long Break
            sessionPrep.focus();
            setSessionRound(1);
            dispatch(arcReset());
            break;
        }
      }
    },
  };

  // useInterval call here
  // Explanation on WHY useInterval is needed
  // https://overreacted.io/making-setinterval-declarative-with-react-hooks/
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

  // Reset Button onPress Handler
  const handleResetButton = () => {
    intervals.stop();
    switch (sessionCtrl) {
      case 0:
        setSessionTime(durations.focus);
        dispatch(arcReset());
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

  // Skip Button onPress Handler
  const handleSkipButton = () => {
    intervals.stop();
    setPlayPauseButtonState(PlayPauseButtonState.Paused);
    setSessionActive(true);
    setSessionPaused(false);

    switch (sessionCtrl) {
      case 0:
        dispatch(increaseCompleted());
        dispatch(arcSkip()); // +1 Pomodoros completed
        // If 4 Round Pomodoros have NOT been completed...
        if (sessionRound !== 4) sessionPrep.short();
        // If 4 Round Pomodoros have been completed...
        if (sessionRound === 4) sessionPrep.long();
        break;
      case 1: // End of Short Break
        sessionPrep.focus();
        dispatch(arcReset());
        break;
      case 2: // End of Long Break
        sessionPrep.focus();
        setSessionRound(1);
        dispatch(arcReset());
        break;
    }
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
      {/* Buttons */}
      <View style={styles.timerContainer}>
        {/* Reset Button */}
        <TouchableOpacity
          style={[styles.button, styles.stopColor]}
          onPress={handleResetButton}
        >
          <Icon name="refresh" size={iconSize.size} color={colors.black} />
        </TouchableOpacity>

        <View style={styles.gap} />
        {/* Play/Pause button */}
        <TouchableOpacity
          style={[styles.button, styles.startColor]}
          onPress={handlePlayPauseButton}
        >
          {
            {
              [PlayPauseButtonState.Started]: (
                <Icon name="pause" size={iconSize.size} color={colors.black} />
              ),
              [PlayPauseButtonState.Paused]: (
                <Icon name="play" size={iconSize.size} color={colors.black} />
              ),
            }[playPauseButtonState]
          }
        </TouchableOpacity>
        <View style={styles.gap} />
        {/* Skip button */}
        <TouchableOpacity
          style={[styles.button, styles.stopColor]}
          onPress={handleSkipButton}
        >
          <Icon name="step-forward" size={iconSize.size} color={colors.black} />
        </TouchableOpacity>
      </View>

      {/* Rounds info */}
      <View style={styles.timerContainer}>
        <TouchableOpacity style={[styles.timeButton]}>
          <Text style={{ textTransform: "capitalize" }}>
            {sessionRound + "/4 Rounds"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Timer;
