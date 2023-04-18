import { TimerUpdateMessage, TimerCommandMessage } from "../helpers/timer-worker-helper"

export interface UpdateTimerTextEvent {
  data: TimerUpdateMessage
}

export interface TimerCommandEvent {
  data: TimerCommandMessage
}

export type TimerOnMessageFunction = (this: Worker | Window, ev: MessageEvent) => unknown;