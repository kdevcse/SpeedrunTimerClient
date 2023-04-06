<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useStopwatch } from '../composables/stopwatch';
import { WorkerCommands } from '../helpers/timer-worker-helper';

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
  window.electronAPI.listenForTimerCommands((_, data) => {
    switch(data) {
      case WorkerCommands.START:
        onTimerStart();
        break;
      case WorkerCommands.STOP:
        onTimerStop();
        break;
      case WorkerCommands.RESET:
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
