<script setup>
import { ref } from 'vue';

let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let timer;
let paused = false;
let prevTime;

const timerTxt = ref(getTimeFormatString());

function setTimeValues(elapsedMilliseconds) {
  milliseconds += elapsedMilliseconds;

  if (milliseconds >= 1000) {
    seconds += (milliseconds - (milliseconds % 1000)) / 1000 ;
    milliseconds = milliseconds % 1000;
    if (seconds >= 60) {
      minutes += (seconds - (seconds % 60)) / 60;
      seconds = seconds % 60;
      if (minutes >= 60) {
        hours += (minutes - (minutes % 60)) / 60;
        minutes = minutes % 60;
      }
    }
  }
}

function getTimeFormatString() {
  const h = hours.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  });
  const min = minutes.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  });
  const s = seconds.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  });
  const ms = milliseconds.toLocaleString('en-US', {
    minimumIntegerDigits: 3,
    useGrouping: false
  });

  return `${h}:${min}:${s}.${ms}`;
}

function incrementTimer() {
  if (paused) {
    return;
  }

  const elapsedMilliseconds = ((new Date()) - prevTime);
  setTimeValues(elapsedMilliseconds);
  timerTxt.value = getTimeFormatString();
  prevTime = new Date();
}

function onTimerStart() {
  if (timer) {
    return;
  }

  paused = false;
  prevTime = new Date();
  timer = setInterval(incrementTimer, 10);
}

function onTimerStop() {
  paused = true;
  clearInterval(timer);
  timer = null;
}

function onTimerReset() {
  paused = true;
  clearInterval(timer);
  [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
  paused = false;
  timerTxt.value = getTimeFormatString();
  timer = null;
}

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
