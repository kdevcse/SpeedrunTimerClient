<template>
  <v-app>
    <v-navigation-drawer permanent>
      <v-list-item title="Settings"></v-list-item>
      <v-divider></v-divider>
      <v-tabs v-model="tab" direction="vertical">
        <v-tab text="General" value="1"></v-tab>
        <v-tab text="Hot Keys" value="2"></v-tab>
        <v-tab text="Layout" value="3"></v-tab>
      </v-tabs>
      <v-divider></v-divider>
      <v-list-item title="Exit" @click="exit"></v-list-item>
    </v-navigation-drawer>
    <v-main>
      <v-tabs-window v-model="tab" class="config-container">
        <v-tabs-window-item value="1">
          <GeneralSettings/>
        </v-tabs-window-item>
        <v-tabs-window-item value="2">
          <HotKeySettings @update-settings="onSettingsUpdate" :settings="settings"/>
        </v-tabs-window-item>
        <v-tabs-window-item value="3">
          <LayoutSettings/>
        </v-tabs-window-item>
        <div v-if="settingsHaveChanged" class="validation-container">
          <v-btn @click="resetSettings">Cancel</v-btn>
          <v-btn @click="saveSettings" color="primary">Save</v-btn>
        </div>
      </v-tabs-window>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
//This link shows how to make a collapsable drawer https://vuetifyjs.com/en/components/navigation-drawers/#expand-on-hover
import { ref, computed } from 'vue';
import GeneralSettings from '../components/GeneralSettings.vue';
import HotKeySettings from '../components/HotKeySettings.vue';
import LayoutSettings from '../components/LayoutSettings.vue';
import { Settings } from '../../common/types/settings-types';
import { onMounted } from 'vue';
import { ElectronApiWindow } from '../../common/types/electron-api';

const tab = ref("1");
const initialSettings = ref<Settings>(null);
const settings = ref<Settings>(null);

onMounted(async () => {
  const electronApiGlobal: ElectronApiWindow = (window as any);
  initialSettings.value = await electronApiGlobal.electronAPI.getSettings();
  settings.value = { ...initialSettings.value };
});

const settingsHaveChanged = computed(() => {
  return JSON.stringify(initialSettings.value) !== JSON.stringify(settings.value);
});

function resetSettings() {
  settings.value = { ...initialSettings.value };
}

async function saveSettings() {
  const electronApiGlobal: ElectronApiWindow = (window as any);
  const normalizedSettings = JSON.parse(JSON.stringify(settings.value));
  const success = await electronApiGlobal.electronAPI.setSettings(normalizedSettings);

  if (success) {
    initialSettings.value = { ...settings.value };
  } else {
    console.error('Failed to save settings');
    settings.value = { ...initialSettings.value };
  }
}

function exit() {
  window.close();
}

function onSettingsUpdate(updatedSettings: Settings) {
  settings.value = { ...updatedSettings };
};

</script>

<style scoped>
.config-container {
  padding: 2em;
}
.validation-container {
  display: flex;
  flex-direction: row;
  position: fixed;
  bottom: 1em;
  right: 1em;
}
.validation-container > * {
  margin-left: 1em;
}
</style>