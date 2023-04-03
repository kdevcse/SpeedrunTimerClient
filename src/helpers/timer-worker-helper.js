import Worker from '../workers/timer-worker?worker';

// Class wrapper for stopwatch Web Worker
export class StopWatchWorker {
  constructor() {
    this.worker = new Worker();
  }

  setOnMessageFunc(onMsgFunc) {
    this.worker.onmessage = onMsgFunc;
  }

  postMessageToWorker(data) {
    this.worker.postMessage(data);
  }

  terminate() {
    this.worker.terminate();
  }
}

export const WorkerCommands = {
  START: 0,
  STOP: 1,
  RESET: 2
}

// Communicates with Web Worker from main thread
export const WorkerCommunicator = {
  setOnMessageFunc: (func) => {
    onmessage = func;
  },
  postMessageToMainThread: (data) => {
    postMessage(data);
  }
};