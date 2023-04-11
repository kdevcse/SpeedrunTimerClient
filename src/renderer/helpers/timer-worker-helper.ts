import { TimerCommands } from "../../common/timer-commands";

// Class wrapper for stopwatch Web Worker
export class TimerWorker {
  worker: Worker;

  constructor() {
    // @ts-ignore: No way around import.meta.url error but it runs fine
    const url = new URL('../workers/timer-worker', import.meta.url);
    this.worker = new Worker(url, {
      type: "module"
    });
  }

  setOnMessageFunc(onMsgFunc) {
    this.worker.onmessage = onMsgFunc;
  }

  postMessageToWorker(data: TimerCommandMessage) {
    this.worker.postMessage(data);
  }

  terminate() {
    this.worker.terminate();
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
  setOnMessageFunc: (func) => {
    onmessage = func;
  },
  postMessageToMainThread: (data: TimerUpdateMessage) => {
    postMessage(data);
  }
};