import { ref } from 'vue';
import { StopWatchWorker, WorkerCommands } from '../helpers/worker-helper';

export function useStopwatch() {
  let stopwatchWorker;

  const timerTxt = ref('00:00:00.000');

  function onTimerInit() {
    if (stopwatchWorker) {
      return;
    }

    stopwatchWorker = new StopWatchWorker();
    stopwatchWorker.setOnMessageFunc(updateTimerTxtFromEvent);
  }

  function updateTimerTxtFromEvent(event) {
    timerTxt.value = event.data.timerTxt;
  }
  
  function onTimerStart() {
    stopwatchWorker.postMessageToMainThread({
      command: WorkerCommands.START
    });
  }
  
  function onTimerStop() {
    stopwatchWorker.postMessageToMainThread({
      command: WorkerCommands.STOP
    });
  }
  
  function onTimerReset() {
    stopwatchWorker.postMessageToMainThread({
      command: WorkerCommands.RESET
    });
  }

  function onTimerTeardown() {
    if (!stopwatchWorker) {
      return;
    }

    stopwatchWorker.terminate();
    stopwatchWorker = undefined;
  }

  return {
    timerTxt,
    onTimerStart, 
    onTimerStop, 
    onTimerReset,
    onTimerInit,
    onTimerTeardown,
    updateTimerTxtFromEvent
  };
}

