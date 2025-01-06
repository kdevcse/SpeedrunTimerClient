/**
@deprecated
*/
<template>
  <v-menu v-model:model-value="contxtMenu" activator="#menu-btn" :target="mousePos">
    <v-list>
      <v-list-item @click="openSettings">
        Settings
      </v-list-item>
      <v-list-item @click="openDevTools">DevTools</v-list-item>
      <v-divider></v-divider>
      <v-list-item @click="exit">Exit</v-list-item>
    </v-list>
  </v-menu>
  <slot name="activator" :show="show" id="menu-btn" />
</template>

<script setup lang="ts">
import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { ref } from 'vue';

const mousePos = ref<[number, number]>([0, 0]);
const contxtMenu = ref(false);

function show(e: MouseEvent) {
  contxtMenu.value = !contxtMenu.value;
  mousePos.value = [e.clientX, e.clientY];
}

function exit() {
  window.close();
}

function openDevTools() {
  /*const electronApiGlobal: ElectronApiWindow = (window as any);
  electronApiGlobal.electronAPI.openDevTools();*/
}

async function openSettings() {
  const settingsWindow = new WebviewWindow('settings', {
    url: '#/settings',
    title: 'Settings',
    width: 800,
    height: 600,
    resizable: false,
    visible: true,
    alwaysOnTop: false,
    parent: getCurrentWindow(),
  });

  settingsWindow.once('tauri://created', () => {
    //settingsWindow.show();
  });
  
  settingsWindow.once('tauri://error', (error) => {
    console.error('Failed to open settings', error);
  });
}

</script>

<style scoped></style>