<template>
  <v-app>
    <v-navigation-drawer permanent>
      <v-list-item title="Settings"></v-list-item>
      <v-divider></v-divider>
      <v-tabs v-model="tab" direction="vertical">
        <v-tab text="General" :value=ConfigurationTabs.General></v-tab>
        <v-tab text="Hot Keys" :value=ConfigurationTabs.HotKeys></v-tab>
        <v-tab text="Layout" :value=ConfigurationTabs.Layout></v-tab>
      </v-tabs>
      <v-divider></v-divider>
      <v-list-item title="Exit" @click="exit"></v-list-item>
    </v-navigation-drawer>
    <v-main>
      <v-tabs-window v-model="tab" class="config-container">
        <v-tabs-window-item :value=ConfigurationTabs.General>
          <GeneralSettings/>
        </v-tabs-window-item>
        <v-tabs-window-item :value=ConfigurationTabs.HotKeys>
          <HotKeySettings @update-settings="onSettingsUpdate" :settings="settings"/>
        </v-tabs-window-item>
        <v-tabs-window-item :value=ConfigurationTabs.Layout>
          <LayoutSettings/>
        </v-tabs-window-item>
        <div v-if="settingsHaveChanged" class="validation-container">
          <v-btn @click="onSettingsReset">Cancel</v-btn>
          <v-btn @click="onSettingsSave" color="primary">Save</v-btn>
        </div>
      </v-tabs-window>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
//This link shows how to make a collapsable drawer https://vuetifyjs.com/en/components/navigation-drawers/#expand-on-hover
import { ref, computed, onMounted } from 'vue';
import GeneralSettings from '../components/GeneralSettings.vue';
import HotKeySettings from '../components/HotKeySettings.vue';
import LayoutSettings from '../components/LayoutSettings.vue';
import { Settings } from '../common/types/settings-types';
import { getDefaultSettings } from '../common/helpers/settings-helper.ts';
import { useSettings } from '../composables/settings.ts';

const enum ConfigurationTabs {
  General = '1',
  HotKeys = '2',
  Layout = '3',
}
const tab = ref(ConfigurationTabs.General);
const { settings, loadSettings, setSettings, saveSettings, resetSettings } = useSettings();
let initSettings = getDefaultSettings(true);

onMounted(async () => {
  initSettings = await loadSettings() ?? initSettings;
});

const settingsHaveChanged = computed(() => {
  console.log(JSON.stringify(initSettings), JSON.stringify(settings.value)); //TODO: Remove after debugging
  return JSON.stringify(initSettings) !== JSON.stringify(settings.value);
});

function onSettingsReset() {
  resetSettings();
}

async function onSettingsSave() {
  await saveSettings();
}

function exit() {
  window.close();
}

function onSettingsUpdate(updatedSettings: Settings) {
  setSettings(updatedSettings);
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