<template>
  <ContextNavMenu>
    <template #activator="{ show }">
      <div class="timer-container" @contextmenu="show">
        <p>{{ timerTxt }}</p>
        <div class="timer-btns-container">
          <button @mousedown="onTimerStart">Start</button>
          <button @mousedown="onTimerStop">Stop</button>
          <button @mousedown="onTimerReset">Reset</button>
        </div>
      </div>
    </template>
  </ContextNavMenu>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useStopwatch } from '../composables/stopwatch';
import { TimerCommands } from '../../common/types/timer-commands';
import { ElectronApiWindow } from '../../common/types/electron-api';
import ContextNavMenu from '../components/ContextNavMenu.vue';

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
  const electronApiGlobal: ElectronApiWindow = (window as any);
  electronApiGlobal.electronAPI.listenForTimerCommands((_, event) => {
    switch(event as unknown as TimerCommands) {
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

<style scoped>
.timer-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  flex: 1;
  /*-webkit-user-select: none;
  user-select: none; /* May want to re-evaluate later */
  /*-webkit-app-region: drag;*/
}
.timer-btns-container {
  display: flex;
  justify-content: center;
  flex-direction: row;
}
button {
  margin: 0 5px;
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

@media (prefers-color-scheme: light) {
  button {
    background-color: #f9f9f9;
  }
}
</style>
