import { TimerCommands } from "../../common/types/timer-commands";
import { TimerOnMessageFunction } from "../types/timer-types";

// Class wrapper for stopwatch Web Worker
export class TimerWorker {
  worker: Worker | undefined;

  constructor() {
    // @ts-ignore: No way around import.meta.env.DEV error but it runs fine
    const urlStr = import.meta.env.DEV ? '../workers/timer-worker' : 'workers/timer-worker.js';
    
    // @ts-ignore: No way around import.meta.url error but it runs fine
    const url = new URL(urlStr, import.meta.url).href;
    this.worker = new Worker(url, { type: "module" });
  }

  setOnMessageFunc(onMsgFunc: TimerOnMessageFunction) {
    if (!this.worker) {
      return;
    }

    this.worker.onmessage = onMsgFunc;
  }

  postMessageToWorker(data: TimerCommandMessage) {
    this.worker?.postMessage(data);
  }

  terminate() {
    this.worker?.terminate();
    this.worker = undefined;
  }
}

export interface TimerCommandMessage {
  command: TimerCommands
}

export interface TimerUpdateMessage {
  timerTxt: string
}

// Communicates with Web Worker from main thread
export const WorkerCommunicator = {
  setOnMessageFunc: (func: TimerOnMessageFunction) => {
    onmessage = func;
  },
  postMessageToMainThread: (data: TimerUpdateMessage) => {
    postMessage(data);
  }
};