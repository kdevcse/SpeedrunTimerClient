import { WorkerCommunicator } from "../helpers/timer-worker-helper";
import { TimerCommands } from "../../common/types/timer-commands";
import { TimerCommandEvent } from "../types/timer-types";

let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let timer: NodeJS.Timer | undefined;
let paused = false;
let prevTime: number;

// Initialize the function to be used when receiving a message 
(function init() {
  WorkerCommunicator.setOnMessageFunc(onMessageFunc);
})();

// The function to be called when receiving a message
export function onMessageFunc(event: TimerCommandEvent) {
  switch(event.data.command) {
    case TimerCommands.START:
      timerStart();
      break;
    case TimerCommands.STOP:
      timerStop();
      break;
    case TimerCommands.RESET:
      timerReset();
      break;
  }
}

export function timerStart() {
  if (timer) {
    return;
  }
  
  paused = false;
  prevTime = new Date().getTime();
  timer = setInterval(incrementTimer, 10);
}

export function timerStop() {
  paused = true;
  clearInterval(timer as any);
  timer = undefined;
}

export function timerReset() {
  paused = true;
  clearInterval(timer as any);
  [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
  paused = false;
  WorkerCommunicator.postMessageToMainThread({ 
    timerTxt: getTimeFormatString() 
  });
  timer = undefined;
}

// Increments the tracked time values and sends message back to main thread
function incrementTimer() {
  if (paused) {
    return;
  }

  const currTime = new Date().getTime();
  const elapsedMilliseconds = ((currTime) - prevTime);
  setTimeValues(elapsedMilliseconds);
  WorkerCommunicator.postMessageToMainThread({ 
    timerTxt: getTimeFormatString() 
  });
  prevTime = new Date().getTime();
}

// Helps remove redundant logic that would be used on setTimeValues
function setTimeValueHelper(prevVal: number, currVal: number, incrementor: number) {
  if (prevVal < incrementor) {
    return [ prevVal, currVal ];
  }

  currVal += (prevVal - (prevVal % incrementor)) / incrementor ;
  prevVal = prevVal % incrementor;
  return [ prevVal, currVal ];
}

// Set timer values to be formatted
function setTimeValues(elapsedMilliseconds: number) {
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