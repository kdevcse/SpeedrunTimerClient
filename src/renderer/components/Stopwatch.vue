<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useStopwatch } from '../composables/stopwatch';
import { TimerCommands } from '../../common/timer-commands';

const {
  timerTxt,
  onTimerStart,
  onTimerStop,
  onTimerReset,
  onTimerInit,
  onTimerTeardown
} = useStopwatch();

onMounted(() => {
  onTimerInit();
  (window as any).electronAPI.listenForTimerCommands((_, data: TimerCommands) => {
    switch(data) {
      case TimerCommands.START:
        onTimerStart();
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
    <p>{{ timerTxt }}</p>
    <button @mousedown="onTimerStart">Start</button>
    <button @mousedown="onTimerStop">Stop</button>
    <button @mousedown="onTimerReset">Reset</button>
  </div>
</template>

<style scoped>
button {
  margin: 0 5px;
}
</style>
