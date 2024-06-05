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
      <v-list-item link title="Exit" to="/timer"></v-list-item>
    </v-navigation-drawer>
    <v-main>
      <v-tabs-window v-model="tab" class="config-container">
        <v-tabs-window-item value="1">
          <GeneralSettings/>
        </v-tabs-window-item>
        <v-tabs-window-item value="2">
          <HotKeySettings :settings="settings"/>
        </v-tabs-window-item>
        <v-tabs-window-item value="3">
          <LayoutSettings/>
        </v-tabs-window-item>
        <div class="validation-container">
          <v-btn>Cancel</v-btn>
          <v-btn color="primary">Save</v-btn>
        </div>
      </v-tabs-window>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
//This link shows how to make a collapsable drawer https://vuetifyjs.com/en/components/navigation-drawers/#expand-on-hover
import { ref } from 'vue';
import GeneralSettings from '../components/GeneralSettings.vue';
import HotKeySettings from '../components/HotKeySettings.vue';
import LayoutSettings from '../components/LayoutSettings.vue';
import { Settings } from '../../common/types/settings-types';
import { onMounted } from 'vue';
import { ElectronApiWindow } from 'src/common/types/electron-api';

const tab = ref("1");
const settings = ref<Settings>(null);

onMounted(async () => {
  const electronApiGlobal: ElectronApiWindow = (window as any);
  settings.value = await electronApiGlobal.electronAPI.getSettings();
});
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