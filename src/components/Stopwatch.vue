<script setup>
import { useStopwatch } from '../composables/stopwatch';

const {
  timerTxt,
  onTimerStart,
  onTimerStop,
  onTimerReset
} = useStopwatch();

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
