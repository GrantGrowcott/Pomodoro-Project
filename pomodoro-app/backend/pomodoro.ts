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
        "short-break",
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
    this.activeSession.endSession();
    if (this.activeSession.type === "focus") {
      // Start break session
      this.breakSession = new Session(
        new Date(),
        this.breakDurationSeconds,
        "short-break",
        null
      );
      return this.breakSession;
    }
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
    // Iterate through pomodoros in reverse order and check for active session on each
    for (let i = this.pomodoros.length - 1; i >= 0; i--) {
      if (this.pomodoros[i].isActive) {
        return this.pomodoros[i].activeSession;
      }
    }
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
  }

  get isActive(): boolean {
    if (this.pomodoros.length === 0) {
      // No pomodoros, must be active
      return true;
    }
    // If any pomodoro is currently active, then the session is active
    if (this.pomodoros.some((pomodoro) => pomodoro.isActive)) {
      return true;
    }
    // No pomodoro is currently active, but has it been more than 2 hours since the last pomodoro?
    if (
      this.lastActiveSession !== null &&
      this.lastActiveSession.actualEndTime !== null &&
      new Date().getTime() - this.lastActiveSession.actualEndTime.getTime() >
        2 * 60 * 60 * 1000
    ) {
      return false;
    }
    return true;
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
    }
    else {
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
        total + pomodoro.focusSession?.timeInSession || 0,
      0
    );
  }

  startSession(): Session {
    if (this.activeSession !== null) {
      throw new Error("Session already started");
    }
    if (this.pomodoros.length === 0) {
      this.addPomodoro();
    }
    if (this.pomodoros.length < 4) {
      let lastPomodoro = this.pomodoros[this.pomodoros.length - 1];
      if (lastPomodoro.isComplete) {
        this.addPomodoro();
        lastPomodoro = this.pomodoros[this.pomodoros.length - 1]; 
      }
      lastPomodoro.startSession();
      if (this.activeSession === null) {
        throw new Error("This should never happen");
      }
      return this.activeSession;
    }
  }

  endSession(): Session | Pomodoro {
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
    // No new session was started, start a new pomodoro
    this.addPomodoro();
  }

  toggleSessionPause() {
    if (!this.isActive) {
      throw new Error("Session not started");
    }
    if (this.activePomodoro === null) {
      throw new Error("This should never happen");
    }
    this.activePomodoro.toggleSessionPause();
  }

  private addPomodoro(): Pomodoro {
    const result = new Pomodoro();
    this.pomodoros.push(result);
    return result;
  }

}
