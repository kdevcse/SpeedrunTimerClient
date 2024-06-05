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
import { Settings, defaultSettings } from '../../common/types/settings-types';
import { onMounted } from 'vue';

onMounted(() => {
  updatedSettings.value = props.settings ?? defaultSettings;
});

const props = defineProps({
  settings: Object as PropType<Settings>,
});

const updatedSettings = ref<Settings>(defaultSettings);

const configuredHotKeys = computed(() => {
  const data: any = updatedSettings.value.hotkeySettings.globalHotkeys;

  if (!data) {
    return [];
  }

  return Object.keys(data).map((key: string) => {
    return {
      name: key.toUpperCase(),
      value: data[key] as string,
    };
  });
});

const addHotKey = (index: number) => {
  console.log('Add Hot Key');
  document.addEventListener('keydown', (event) => {
    console.log(event.key);
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
