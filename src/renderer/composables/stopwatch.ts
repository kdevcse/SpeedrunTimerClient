import { ref } from 'vue';
import { TimerWorker } from '../helpers/timer-worker-helper';
import { TimerCommands } from '../../common/types/timer-commands';
import { UpdateTimerTextEvent } from '../types/timer-types';

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

  function updateTimerTxtFromWorkerMsg(event: UpdateTimerTextEvent) {
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

