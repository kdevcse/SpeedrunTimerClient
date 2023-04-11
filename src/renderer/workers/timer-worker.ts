import { WorkerCommands, WorkerCommunicator } from "../helpers/timer-worker-helper";

let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let timer;
let paused = false;
let prevTime;

// Initialize the function to be used when receiving a message 
(function init() {
  WorkerCommunicator.setOnMessageFunc(onMessageFunc);
})();

// The function to be called when receiving a message
export function onMessageFunc(event) {
  switch(event.data.command) {
    case WorkerCommands.START:
      timerStart();
      break;
    case WorkerCommands.STOP:
      timerStop();
      break;
    case WorkerCommands.RESET:
      timerReset();
      break;
  }
}

export function timerStart() {
  if (timer) {
    return;
  }
  
  paused = false;
  prevTime = new Date();
  timer = setInterval(incrementTimer, 10);
}

export function timerStop() {
  paused = true;
  clearInterval(timer);
  timer = null;
}

export function timerReset() {
  paused = true;
  clearInterval(timer);
  [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
  paused = false;
  WorkerCommunicator.postMessageToMainThread({ 
    timerTxt: getTimeFormatString() 
  });
  timer = null;
}

// Increments the tracked time values and sends message back to main thread
function incrementTimer() {
  if (paused) {
    return;
  }

  const elapsedMilliseconds = ((new Date()) - prevTime);
  setTimeValues(elapsedMilliseconds);
  WorkerCommunicator.postMessageToMainThread({ 
    timerTxt: getTimeFormatString() 
  });
  prevTime = new Date();
}

// Helps remove redundant logic that would be used on setTimeValues
function setTimeValueHelper(prevVal, currVal, incrementor) {
  if (prevVal < incrementor) {
    return [ prevVal, currVal ];
  }

  currVal += (prevVal - (prevVal % incrementor)) / incrementor ;
  prevVal = prevVal % incrementor;
  return [ prevVal, currVal ];
}

// Set timer values to be formatted
function setTimeValues(elapsedMilliseconds) {
  milliseconds += elapsedMilliseconds;

  [ milliseconds, seconds ] = setTimeValueHelper(milliseconds, seconds, 1000);
  [ seconds, minutes ] = setTimeValueHelper(seconds, minutes, 60);
  [ minutes, hours ] = setTimeValueHelper(minutes, hours, 60);
}

// Formats the message to be sent to main thread
export function getTimeFormatString() {
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