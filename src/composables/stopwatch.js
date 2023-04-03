import { ref } from 'vue';
import { TimerWorker, WorkerCommands } from '../helpers/timer-worker-helper';

export function useStopwatch() {
  let timerWorker;

  const timerTxt = ref('00:00:00.000');

  function onTimerInit() {
    if (timerWorker) {
      return;
    }

    timerWorker = new TimerWorker();
    timerWorker.setOnMessageFunc(updateTimerTxtFromWorkerMsg);
  }

  function updateTimerTxtFromWorkerMsg(event) {
    timerTxt.value = event.data.timerTxt;
  }
  
  function onTimerStart() {
    timerWorker.postMessageToWorker({
      command: WorkerCommands.START
    });
  }
  
  function onTimerStop() {
    timerWorker.postMessageToWorker({
      command: WorkerCommands.STOP
    });
  }
  
  function onTimerReset() {
    timerWorker.postMessageToWorker({
      command: WorkerCommands.RESET
    });
  }

  function onTimerTeardown() {
    if (!timerWorker) {
      return;
    }

    timerWorker.terminate();
    timerWorker = undefined;
  }

  return {
    timerTxt,
    onTimerStart, 
    onTimerStop, 
    onTimerReset,
    onTimerInit,
    onTimerTeardown,
    updateTimerTxtFromWorkerMsg
  };
}

