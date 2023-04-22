<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useStopwatch, StopwatchProps } from '../composables/stopwatch';
import { TimerCommands } from '../../common/types/timer-commands';
import { ElectronApiWindow } from '../../common/types/electron-api';
import { SpeedrunInfo } from '../../common/types/speedrun';

const props: StopwatchProps = defineProps<{
  speedrun: SpeedrunInfo
}>();

const {
  timerTxt,
  speedrunTitle,
  splitName,
  onTimerStart,
  onTimerSplit,
  onTimerStop,
  onTimerReset,
  onTimerInit,
  onTimerTeardown
} = useStopwatch(props);

onMounted(() => {
  onTimerInit();
  const electronApiGlobal: ElectronApiWindow = (window as any);
  electronApiGlobal.electronAPI.listenForTimerCommands((_, data: TimerCommands) => {
    switch(data) {
      case TimerCommands.START:
        onTimerStart();
        break;
      case TimerCommands.SPLIT:
        onTimerSplit();
        break;
      case TimerCommands.STOP:
        onTimerStop();
        break;
      case TimerCommands.RESET:
        onTimerReset();
        break;
      }
  });
});

onUnmounted(() => {
  onTimerTeardown();
});

</script>

<template>
  <div>
    <h1 v-if="speedrunTitle">{{ speedrunTitle }}</h1>
    <h2 v-if="splitName">{{ splitName }}</h2>
    <p>{{ timerTxt }}</p>
    <button @mousedown="onTimerStart">Start</button>
    <button @mousedown="onTimerSplit">Split</button>
    <button @mousedown="onTimerStop">Stop</button>
    <button @mousedown="onTimerReset">Reset</button>
  </div>
</template>

<style scoped>
button {
  margin: 0 5px;
}
</style>
