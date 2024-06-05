<template>
  <h2>Hot Key Settings</h2>
  <v-form v-if="settings">
    <div class="hot-key-setting-container">
      <v-label>GLOBAL</v-label>
      <v-switch color="primary" hide-details v-model="updatedSettings.hotkeySettings.enableGlobalHotkeys"/>
    </div>
    <template v-for="(chk, index) in configuredHotKeys">
      <div class="hot-key-setting-container">
        <v-label>{{ chk.name }}</v-label>
        <v-btn size="large" @click="addHotKey(index)">{{ chk.value }}</v-btn>
      </div>
    </template>
  </v-form>
</template>

<script setup lang="ts">
import { PropType, computed, ref } from 'vue';
import { getDefaultSettings } from '../../common/helpers/settings-helper';
import { onMounted } from 'vue';
import keycode from 'keycode';
import { GlobalHotKeyActions, Settings } from '../../common/types/settings-types';
import { convertUiohookFromKeycode, getHotKeyName } from '../../common/helpers/keycode-converter';

onMounted(() => {
  updatedSettings.value = props.settings ?? getDefaultSettings(true);
});

const props = defineProps({
  settings: Object as PropType<Settings>,
});

const updatedSettings = ref<Settings>(getDefaultSettings(true));

const configuredHotKeys = computed(() => {
  const data: GlobalHotKeyActions = updatedSettings.value.hotkeySettings.globalHotkeys;

  if (!data) {
    return [];
  }

  return Object.keys(data).map((key: keyof GlobalHotKeyActions) => {
    return {
      name: key.toUpperCase(),
      value: getHotKeyName(data[key]),
    };
  });
});

const addHotKey = (index: number) => {
  console.log('Add Hot Key');
  document.addEventListener('keydown', (event) => {
    console.log(keycode(event));
  });
};
</script>

<style scoped>
.hot-key-setting-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1em;
}
.hot-key-setting-container > * {
  align-self: center;
}
</style>
