// Class wrapper for stopwatch Web Worker
export class TimerWorker {
  worker: Worker;

  constructor() {
    const url = new URL('../workers/timer-worker', import.meta.url);
    this.worker = new Worker(url, {
      type: "module"
    });
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