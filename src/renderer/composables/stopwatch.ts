import { ref } from 'vue';

export function useStopwatch() {
  const timerTxt = ref('00:00:00.000');
  let paused = false;
  let prevTime: number;
  let animationFrameId: number | undefined;
  let elapsedTime = 0;

  function onTimerStart() {
    if (animationFrameId) {
      return;
    }

    paused = false;
    prevTime = performance.now();
    animationFrameId = requestAnimationFrame(incrementTimer);
  }

  function onTimerStop() {
    paused = true;
    cancelTimer();
  }

  function onTimerReset() {
    paused = true;
    cancelTimer();
    elapsedTime = 0;
    paused = false;
    timerTxt.value = getTimeFormatString(elapsedTime);
  }

  function cancelTimer() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = undefined;
    }
  }

  // Increments the tracked time values and sends message back to main thread
  function incrementTimer(timestamp: number) {
    if (paused) {
      return;
    }

    const elapsedMilliseconds = timestamp - prevTime;
    elapsedTime += elapsedMilliseconds;
    const newTimerTxt = getTimeFormatString(elapsedTime);

    if (newTimerTxt !== timerTxt.value) {
      timerTxt.value = newTimerTxt;
    }

    prevTime = performance.now();

    animationFrameId = requestAnimationFrame(incrementTimer);
  }

  // Formats the message to be sent to main thread
  function getTimeFormatString(elapsedTime: number) {
    // Calculate hours, minutes, seconds, and milliseconds from the total elapsed time
    const hours = Math.floor(elapsedTime / 3600000);
    const minutes = Math.floor((elapsedTime % 3600000) / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const milliseconds = elapsedTime % 1000;

    const h = hours.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    const min = minutes.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    const s = seconds.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    const ms = milliseconds.toLocaleString('en-US', {
      minimumIntegerDigits: 3,
      useGrouping: false,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    return `${h}:${min}:${s}.${ms}`;
  }

  return {
    timerTxt,
    onTimerStart,
    onTimerStop,
    onTimerReset,
  };
}

