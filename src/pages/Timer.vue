<template>
  <div class="timer-container" @contextmenu="onRightClick">
    <p>{{ timerTxt }}</p>
    <div class="timer-btns-container">
      <button @mousedown="onTimerStart">Start</button>
      <button @mousedown="onTimerStop">Stop</button>
      <button @mousedown="onTimerReset">Reset</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useStopwatch } from '../composables/stopwatch';
import { useSettings } from '../composables/settings';
import { Submenu } from '@tauri-apps/api/menu';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { WebviewWindow } from '@tauri-apps/api/webviewWindow';

const { settings, loadSettings } = useSettings();
const {
  timerTxt,
  onTimerStart,
  onTimerStop,
  onTimerReset,
  registerGlobalTimerShortcuts
} = useStopwatch();

onMounted(async () => {
  try {
    await loadSettings();
    await registerGlobalTimerShortcuts(settings.value.hotkeySettings);
  } catch (error) {
    console.error('Failed to load settings', error);
  }
});

async function onRightClick() {
  const contextMenu = (await Submenu.new({
    id: 'timer-context-menu',
    items: [
      {
        text: 'Settings',
        action: () => {

          const settingsWindow = new WebviewWindow('settings', {
            url: '#/settings',
            title: 'Settings',
            width: 800,
            height: 600,
            resizable: false,
            visible: true,
            parent: getCurrentWindow(),
          });

          settingsWindow.once('tauri://created', () => {
            //settingsWindow.show();
          });

          settingsWindow.once('tauri://error', (error) => {
            console.error('Failed to open settings', error);
          });
        },
      },
      {
        text: 'DevTools',
        action: () => {
          // openDevTools();
        },
      },
      {
        text: 'Exit',
        action: () => {
          getCurrentWindow().close();
        },
      },
    ],
    text: 'Context Menu'
  }));
  await contextMenu.popup(undefined, getCurrentWindow());
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
