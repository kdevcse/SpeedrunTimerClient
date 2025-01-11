<template>
  <h2>Hot Key Settings</h2>
  <v-form v-if="settings">
    <div class="hot-key-setting-container">
      <v-label>GLOBAL</v-label>
      <v-switch color="primary" hide-details v-model="props.settings.hotkeySettings.enableGlobalHotkeys"/>
    </div>
    <template v-for="(chk, index) in configuredHotKeys">
      <div class="hot-key-setting-container">
        <v-label>{{ chk.name }}</v-label>
        <v-btn 
          :disabled="waitingForHotKeyIndex !== -1 && waitingForHotKeyIndex !== index" 
          size="large" 
          @click="addHotKey(index, chk.key)">
            {{ waitingForHotKeyIndex !== -1 && waitingForHotKeyIndex === index ? '...' : chk.value }}
        </v-btn>
      </div>
    </template>
  </v-form>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { GlobalHotKeyActions, Settings } from '../common/types/settings-types';
import { getHotKeyName } from '../common/helpers/keycode-converter';

const emit = defineEmits(['updateSettings']);

const props = defineProps<{
  settings: Settings;
}>();

const waitingForHotKeyIndex = ref(-1);
const configuredHotKeys = computed(() => {
  const data: GlobalHotKeyActions = props.settings.hotkeySettings?.globalHotkeys;

  if (!data) {
    return [];
  }

  return Object.keys(data).map((key) => {
    return {
      name: (key as keyof GlobalHotKeyActions).toUpperCase(),
      value: getHotKeyName(data[key as keyof GlobalHotKeyActions], true),
      key: key as keyof GlobalHotKeyActions,
    };
  });
});

const addHotKey = (index: number, key: keyof GlobalHotKeyActions) => {
  const keydownListner = (event: KeyboardEvent) => {
    waitingForHotKeyIndex.value = -1;
    document.removeEventListener('keydown', keydownListner);

    emit('updateSettings', {
      ...props.settings,
      hotkeySettings: {
        ...props.settings.hotkeySettings,
        globalHotkeys: {
          ...props.settings.hotkeySettings.globalHotkeys,
          [key]: event.keyCode || event.which,
        },
      },
    });
  };

  document.addEventListener('keydown', keydownListner);
  waitingForHotKeyIndex.value = index;

  // Remove the listener after 5 seconds
  setTimeout(() => {
    document.removeEventListener('keydown', keydownListner);
    waitingForHotKeyIndex.value = -1;
  }, 5000);
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
