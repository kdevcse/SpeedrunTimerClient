<template>
  <v-menu v-model:model-value="contxtMenu" activator="#menu-btn" :target="mousePos">
    <v-list>
      <v-list-item>
        <RouterLink to="/settings" target="_blank">Settings</RouterLink>
      </v-list-item>
      <v-list-item @click="openDevTools">DevTools</v-list-item>
      <v-divider></v-divider>
      <v-list-item @click="exit">Exit</v-list-item>
    </v-list>
  </v-menu>
  <slot name="activator" :show="show" id="menu-btn"/>
</template>

<script setup lang="ts">
import { ElectronApiWindow } from 'src/common/types/electron-api';
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
  const electronApiGlobal: ElectronApiWindow = (window as any);
  electronApiGlobal.electronAPI.openDevTools();
}

</script>

<style scoped>
</style>