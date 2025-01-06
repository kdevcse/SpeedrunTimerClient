<template>
  <ContextNavMenu>
    <template #activator="{ show }">
      <div class="timer-container" @contextmenu="onRightClick(show, $event)">
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
import { onMounted } from 'vue';
import { useStopwatch } from '../composables/stopwatch';
import ContextNavMenu from '../components/ContextNavMenu.vue';
import { useSettings } from '../composables/settings';
import { load } from '@tauri-apps/plugin-store';

const { settings, loadSettings } = useSettings();
const {
  timerTxt,
  onTimerStart,
  onTimerStop,
  onTimerReset,
  registerGlobalTimerShortcuts
} = useStopwatch();

onMounted(async () => {
  const store = await load('settings.json', { autoSave: false, createNew: true });
  await loadSettings(store);
  await registerGlobalTimerShortcuts(settings.value.hotkeySettings);
});

function onRightClick(show: (e: MouseEvent) => void, event: MouseEvent) {
  show(event);
  event.preventDefault();
};

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
