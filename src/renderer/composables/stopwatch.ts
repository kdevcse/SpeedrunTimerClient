import { ref } from 'vue';
import { TimerWorker } from '../helpers/timer-worker-helper';
import { TimerCommands } from '../../common/types/timer-commands';
import { UpdateTimerTextEvent } from '../types/timer-types';
import { SpeedrunManager } from '../helpers/speedrun-manager';
import { StopwatchProps } from '../components/Stopwatch.vue';
import { SpeedrunInfo } from '../../common/types/speedrun';

export interface StopwatchProps {
  speedrun: SpeedrunInfo
}

export function useStopwatch(props: StopwatchProps ) {

  let timerWorker: TimerWorker;
  let speedrunManager: SpeedrunManager;

  const timerTxt = ref('00:00:00.000');
  const splitName = ref<string>();
  const speedrunTitle = ref<string>();

  function onTimerInit() {
    if (timerWorker) {
      return;
    }

    timerWorker = new TimerWorker();
    timerWorker.setOnMessageFunc(updateTimerTxtFromWorkerMsg);

    if (!props.speedrun) {
      return;
    }

    speedrunManager = new SpeedrunManager(props.speedrun);
    speedrunTitle.value = props.speedrun.title;
    splitName.value = speedrunManager.CurrentSplitName;
  }

  function updateTimerTxtFromWorkerMsg(event: UpdateTimerTextEvent) {
    if (event.data.timerTxt) {
      timerTxt.value = event.data.timerTxt;
    }
    
    if (event.data.splitTime && speedrunManager) {
      speedrunManager.updateSplit(event.data.splitTime);
      splitName.value = speedrunManager.CurrentSplitName;
      console.log(`Run Over?: ${speedrunManager.IsRunOver}`);
    }

  }
  
  function onTimerStart() {
    timerWorker.postMessageToWorker({
      command: TimerCommands.START
    });
  }

  function onTimerSplit() {
    const cmd = speedrunManager.IsOnLastSplit ? TimerCommands.SPLITANDSTOP : TimerCommands.SPLIT;
    timerWorker.postMessageToWorker({
      command: cmd
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
    splitName,
    speedrunTitle,
    onTimerStart,
    onTimerSplit,
    onTimerStop, 
    onTimerReset,
    onTimerInit,
    onTimerTeardown,
    updateTimerTxtFromWorkerMsg
  };
}

