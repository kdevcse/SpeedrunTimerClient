import { ref } from 'vue';
import { TimerWorker } from '../helpers/timer-worker-helper';
import { TimerCommands } from '../../common/timer-commands';

export function useStopwatch() {
  let timerWorker: TimerWorker;

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
      command: TimerCommands.START
    });
  }
  
  function onTimerStop() {
    timerWorker.postMessageToWorker({
      command: TimerCommands.STOP
    });
  }
  
  function onTimerReset() {
    timerWorker.postMessageToWorker({
      command: TimerCommands.RESET
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

