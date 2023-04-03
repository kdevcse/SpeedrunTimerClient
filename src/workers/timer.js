import workerHelper, { WorkerCommands } from "../helpers/worker-helper";

let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let timer;
let paused = false;
let prevTime;

function init() {
  workerHelper.setOnMessageFunc(onMessageFunc);
};

function incrementTimer() {
  if (paused) {
    return;
  }

  const elapsedMilliseconds = ((new Date()) - prevTime);
  setTimeValues(elapsedMilliseconds);
  workerHelper.postMessageToWorker({ 
    timerTxt: getTimeFormatString() 
  });
  prevTime = new Date();
}

function setTimeValueHelper(prevVal, currVal, incrementor) {
  if (prevVal < incrementor) {
    return [ prevVal, currVal ];
  }

  currVal += (prevVal - (prevVal % incrementor)) / incrementor ;
  prevVal = prevVal % incrementor;
  return [ prevVal, currVal ];
}

function setTimeValues(elapsedMilliseconds) {
  milliseconds += elapsedMilliseconds;

  [ milliseconds, seconds ] = setTimeValueHelper(milliseconds, seconds, 1000);
  [ seconds, minutes ] = setTimeValueHelper(seconds, minutes, 60);
  [ minutes, hours ] = setTimeValueHelper(minutes, hours, 60);
}
  
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
  workerHelper.postMessageToWorker({ 
    timerTxt: getTimeFormatString() 
  });
  timer = null;
}

init();