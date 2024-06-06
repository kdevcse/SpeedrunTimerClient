<template>
  <h2>Hot Key Settings</h2>
  <v-form v-if="settings">
    <div class="hot-key-setting-container">
      <v-label>GLOBAL</v-label>
      <v-switch color="primary" hide-details v-model="updatedSettings.enableGlobalHotkeys"/>
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
import { PropType, computed, ref } from 'vue';
import { getDefaultSettings } from '../../common/helpers/settings-helper';
import { onMounted } from 'vue';
import { GlobalHotKeyActions, HotKeySettings, Settings } from '../../common/types/settings-types';
import { getHotKeyName } from '../../common/helpers/keycode-converter';

const emit = defineEmits(['updateSettings']);

const props = defineProps({
  settings: Object as PropType<Settings>,
});

onMounted(() => {
  console.log('render');
});

const updatedSettings = ref<HotKeySettings>(getDefaultSettings(true).hotkeySettings);
const waitingForHotKeyIndex = ref(-1);
const configuredHotKeys = computed(() => {
  const data: GlobalHotKeyActions = props.settings.hotkeySettings?.globalHotkeys;

  if (!data) {
    return [];
  }

  return Object.keys(data).map((key: keyof GlobalHotKeyActions) => {
    return {
      name: key.toUpperCase(),
      value: getHotKeyName(data[key], true),
      key: key,
    };
  });
});

const addHotKey = (index: number, key: keyof GlobalHotKeyActions) => {
  const keydownListner = (event: KeyboardEvent) => {
    waitingForHotKeyIndex.value = -1;
    document.removeEventListener('keydown', keydownListner);
    console.log('event', event);

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
