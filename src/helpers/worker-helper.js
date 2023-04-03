import Worker from '../workers/timer?worker';

export class StopWatchWorker {
  constructor(onMsgFunc) {
    this.worker = new Worker();
    this.worker.onmessage = onMsgFunc;
  }

  postMessage(data) {
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

export const workerWrapper = {
  setOnMessageFunc: (func) => {
    self.onmessage = func;
  },
  postMessageToWorker: (data) => {
    self.postMessage(data);
  }
};

export default workerWrapper;