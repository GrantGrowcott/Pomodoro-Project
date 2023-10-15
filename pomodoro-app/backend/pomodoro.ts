export enum SessionStatus {
  InProgress = "in progress",
  Paused = "paused",
  Completed = "completed",
}

export enum SessionTimeStatus {
  WithinTime = "within time",
  OverTime = "over time",
}
export class Pause {
  constructor(startTime: Date = new Date()) {
    this.startTime = startTime;
  }
  isInProgress(): boolean {
    return this.endTime === null;
  }

  timeElapsed(): number {
    if (this.isInProgress()) {
      return new Date().getTime() - this.startTime.getTime();
    } else {
      if (this.endTime === null) {
        throw new Error("End time is null");
      }
      return this.endTime.getTime() - this.startTime.getTime();
    }
  }
  startTime: Date;
  endTime: Date | null = null;
}

export class Session {
  startTime: Date;
  durationSeconds: number;
  type: "short-break" | "long-break" | "focus";
  pause: Pause | null;

  constructor(
    startTime: Date,
    durationSeconds: number,
    type: "short-break" | "long-break" | "focus",
    pause: Pause | null
  ) {
    if (durationSeconds <= 0) {
      throw new Error("durationSeconds must be positive");
    }

    this.startTime = startTime;
    this.durationSeconds = durationSeconds;
    this.type = type;
    this.pause = pause;
  }

  private _actualEndTime: Date | null = null;

  get actualEndTime(): Date | null {
    return this._actualEndTime;
  }

  set actualEndTime(value: Date | null) {
    if (value !== null && value < this.startTime) {
      throw new Error("actualEndTime cannot be less than startTime");
    }
    this._actualEndTime = value;
  }

  get originalEndTime(): Date {
    if (this.pause !== null) {
      return new Date(
        this.startTime.getTime() +
          this.pause.timeElapsed() +
          this.durationSeconds * 1000
      );
    }
    return new Date(this.startTime.getTime() + this.durationSeconds * 1000);
  }

  get timeInSession() {
    if (this.actualEndTime !== null) {
      return this.actualEndTime.getTime() - this.startTime.getTime();
    }
    const result = new Date().getTime() - this.startTime.getTime();
    if (this.pause === null) {
      return result;
    }
    return result - this.pause.timeElapsed();
  }

  get timeRemainingSeconds() {
    if (this.actualEndTime !== null) {
      return 0;
    }
    const result =
      (this.originalEndTime.getTime() - new Date().getTime()) / 1000;
    if (result < 0) {
      return 0;
    }
    return result;
  }

  get sessionStatus(): SessionStatus {
    if (this.actualEndTime === null) {
      return SessionStatus.InProgress;
    } else if (this.pause !== null && this.pause.isInProgress()) {
      return SessionStatus.Paused;
    } else {
      return SessionStatus.Completed;
    }
  }

  get sessionTimeStatus(): SessionTimeStatus {
    if (this.actualEndTime === null && new Date() < this.originalEndTime) {
      return SessionTimeStatus.WithinTime;
    } else if (
      this.actualEndTime !== null &&
      this.actualEndTime < this.originalEndTime
    ) {
      return SessionTimeStatus.WithinTime;
    }
    return SessionTimeStatus.OverTime;
  }

  get isInProgress() {
    return this.sessionStatus === SessionStatus.InProgress;
  }

  get isPaused() {
    return this.sessionStatus === SessionStatus.Paused;
  }

  get isCompleted() {
    return this.sessionStatus === SessionStatus.Completed;
  }

  get isWithinTime() {
    return this.sessionTimeStatus === SessionTimeStatus.WithinTime;
  }

  get isOverTime() {
    return this.sessionTimeStatus === SessionTimeStatus.OverTime;
  }

  get isActive() {
    return this.isInProgress || this.isPaused;
  }

  get pausedOnce() {
    return this.pause !== null;
  }

  endSession() {
    if (this.actualEndTime !== null) {
      throw new Error("Session already ended");
    }
    this.actualEndTime = new Date();
  }

  toggleSessionPause() {
    if (this.pause === null) {
      this.pause = new Pause();
    } else if (this.pause.isInProgress()) {
      this.pause.endTime = new Date();
    } else {
      throw new Error("Session can only be paused once");
    }
  }
}

export class Pomodoro {
  focusSession: Session | null = null;
  focusDurationSeconds: number = 25 * 60;
  breakSession: Session | null = null;
  breakDurationSeconds: number = 5 * 60;
  breakSessionType: "short-break" | "long-break" = "short-break";

  constructor(
    focusDurationSeconds: number = 25 * 60,
    breakDurationSeconds: number = 5 * 60,
    breakSessionType: "short-break" | "long-break" = "short-break"
  ) {
    this.focusDurationSeconds = focusDurationSeconds;
    this.breakDurationSeconds = breakDurationSeconds;
    this.breakSessionType = breakSessionType;
  }

  get lastActiveSession(): Session | null {
    if (this.breakSession !== null) {
      return this.breakSession;
    }
    return this.focusSession;
  }

  get lastCompleteSession(): Session | null {
    if (this.breakSession !== null && this.breakSession.isCompleted) {
      return this.breakSession;
    }
    if (this.focusSession !== null && this.focusSession.isCompleted) {
      return this.focusSession;
    }
    return null;
  }

  get activeSession(): Session | null {
    if (this.lastActiveSession !== null && this.lastActiveSession.isActive) {
      return this.lastActiveSession;
    }
    return null;
  }

  get isActive(): boolean {
    return this.activeSession !== null && this.activeSession.isActive;
  }

  get isComplete(): boolean {
    return !this.isActive;
  }

  startSession() {
    if (this.isActive) {
      throw new Error("Session already started");
    }
    if (this.focusSession === null) {
      this.focusSession = new Session(
        new Date(),
        this.focusDurationSeconds,
        "focus",
        null
      );
    } else if (this.focusSession.isCompleted && this.breakSession === null) {
      this.breakSession = new Session(
        new Date(),
        this.breakDurationSeconds,
        this.breakSessionType,
        null
      );
    } else {
      throw new Error("Cannot start session");
    }
  }

  endSession(): Session | null {
    if (!this.isActive) {
      throw new Error("Session not started");
    }
    if (this.activeSession === null) {
      throw new Error("This should never happen");
    }
    const endedSessionType = this.activeSession.type;
    this.activeSession.endSession();
    if (endedSessionType === "focus") {
      // Start break session
      console.log("Start break session");
      this.breakSession = new Session(
        new Date(),
        this.breakDurationSeconds,
        this.breakSessionType,
        null
      );
      return this.breakSession;
    }
    return null;
  }

  toggleSessionPause() {
    if (!this.isActive) {
      throw new Error("Session not started");
    }
    if (this.activeSession === null) {
      throw new Error("This should never happen");
    }
    this.activeSession.toggleSessionPause();
  }
}

export class PomodoroSession {
  pomodoros: Pomodoro[] = new Array(4);
  focusDurationSeconds: number = 25 * 60;
  shortBreakDurationSeconds: number = 5 * 60;
  longBreakDurationSeconds: number = 15 * 60;

  constructor(
    focusDurationSeconds: number = 25 * 60,
    shortBreakDurationSeconds: number = 5 * 60,
    longBreakDurationSeconds: number = 15 * 60
  ) {
    this.pomodoros = [];
    this.focusDurationSeconds = focusDurationSeconds;
    this.shortBreakDurationSeconds = shortBreakDurationSeconds;
    this.longBreakDurationSeconds = longBreakDurationSeconds;
    this.addPomodoro();
  }

  get activePomodoro(): Pomodoro | null {
    if (this.pomodoros.length === 0) {
      return null;
    }
    if (this.pomodoros[this.pomodoros.length - 1].isActive) {
      return this.pomodoros[this.pomodoros.length - 1];
    }
    return null;
  }

  get lastActiveSession(): Session | null {
    // IF there are no pomodoros, there can be no active session
    console.log(this.pomodoros);
    if (this.pomodoros.length === 0) {
      return null;
    }
    // Iterate through pomodoros in reverse order and check for active session on each
    for (let i = this.pomodoros.length - 1; i >= 0; i--) {
      // If pomodoros[i] is undefined, throw an error
      if (this.pomodoros[i].isActive) {
        return this.pomodoros[i].activeSession;
      }
    }
    return null;
  }

  get lastCompleteSession(): Session | null {
    // Iterate through pomodoros in reverse order and check for completed session on each
    for (let i = this.pomodoros.length - 1; i >= 0; i--) {
      if (this.pomodoros[i].isComplete) {
        return this.pomodoros[i].lastCompleteSession;
      }
    }
    return null;
  }

  get activeSession(): Session | null {
    if (this.activePomodoro !== null && this.activePomodoro.isActive) {
      return this.activePomodoro.activeSession;
    }
    return null;
  }

  get isActive(): boolean {
    return this.activeSession !== null && this.activeSession.isActive;
  }

  get isComplete(): boolean {
    return !this.isActive;
  }

  get activeOrNextSessionType(): "focus" | "short-break" | "long-break" {
    if (this.activePomodoro === null) {
      // Brand new session, first session is always focus
      return "focus";
    }
    if (this.activeSession !== null) {
      // Active session, return type of active session
      return this.activeSession.type;
    }
    if (this.pomodoros.length === 4) {
      // Either focus or long-break
      if (this.lastCompleteSession === null) {
        throw new Error("This should never happen");
      }
      if (this.lastCompleteSession.type === "focus") {
        // Last session was focus, return long-break
        return "long-break";
      }
      return "focus";
    } else {
      // Either focus or short-break
      if (this.lastCompleteSession === null) {
        throw new Error("This should never happen");
      }
      if (this.lastCompleteSession.type === "focus") {
        // Last session was focus, return long-break
        return "short-break";
      }
      return "focus";
    }
  }

  get totalFocusTimeSeconds(): number {
    return this.pomodoros.reduce(
      (total, pomodoro) =>
        total +
        (pomodoro.focusSession ? pomodoro.focusSession.timeInSession : 0),
      0
    );
  }

  startSession(): Session {
    console.log("startSession");
    if (this.activeSession !== null) {
      throw new Error("Session already started");
    }
    let lastPomodoro = this.pomodoros[this.pomodoros.length - 1];
    if (lastPomodoro.isComplete) {
      console.log("Adding pomodoro because last pomodoro is complete");
      // Use a long break if 4 focus sessions are done
      console.log(
        "in startSession: ",
        this.pomodoros.length % 4 === 0,
        this.pomodoros.length
      );
      this.addPomodoro(this.pomodoros.length % 4 === 0);
      lastPomodoro = this.pomodoros[this.pomodoros.length - 1];
    }
    lastPomodoro.startSession();
    if (this.activeSession === null) {
      throw new Error("This should never happen");
    }
    return this.activeSession;
  }

  endSession(): Session | null {
    if (!this.isActive) {
      throw new Error("Session not started");
    }
    if (this.activePomodoro === null) {
      throw new Error("This should never happen");
    }
    if (this.activePomodoro.activeSession === null) {
      throw new Error("This should never happen");
    }
    const maybeBreakSession = this.activePomodoro.endSession();
    if (maybeBreakSession !== null) {
      // Break session was started, return it
      return maybeBreakSession;
    }
    return null;
  }

  toggleSession(): Session | null {
    if (this.isActive) {
      return this.endSession();
    }
    return this.startSession();
  }

  toggleSessionPause() {
    console.log("toggleSessionPause", this.isActive);
    if (!this.isActive) {
      throw new Error("Session not started");
    }
    if (this.activePomodoro === null) {
      throw new Error("This should never happen");
    }
    this.activePomodoro.toggleSessionPause();
  }

  private addPomodoro(useLongBreak: boolean = false): Pomodoro {
    let breakDurationSeconds = this.shortBreakDurationSeconds;
    let breakSessionType: "short-break" | "long-break" = "short-break";
    if (useLongBreak) {
      breakDurationSeconds = this.longBreakDurationSeconds;
      breakSessionType = "long-break";
    }
    const result = new Pomodoro(
      this.focusDurationSeconds,
      breakDurationSeconds,
      breakSessionType
    );
    this.pomodoros.push(result);
    return result;
  }
}
