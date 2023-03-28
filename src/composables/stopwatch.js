import { ref } from 'vue';
import Worker from '../workers/timer?worker';

export function useStopwatch() {
  let worker;

  const timerTxt = ref('00:00:00.000');

  function onTimerInit() {
    if (worker) {
      return;
    }

    worker = new Worker('/workers/timer.js');
    worker.onmessage = (event) => {
      timerTxt.value = event.data.timerTxt;
    };
  }
  
  function onTimerStart() {
    worker.postMessage({
      command: 0
    });
  }
  
  function onTimerStop() {
    worker.postMessage({
      command: 1
    });
  }
  
  function onTimerReset() {
    worker.postMessage({
      command: 2
    });
  }

  function onTimerTeardown() {
    if (!worker) {
      return;
    }

    worker.terminate();
    worker = undefined;
  }

  return {
    timerTxt,
    onTimerStart, 
    onTimerStop, 
    onTimerReset,
    onTimerInit,
    onTimerTeardown
  };
}

