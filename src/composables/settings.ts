import { load, Store } from '@tauri-apps/plugin-store'; //https://v2.tauri.app/plugin/store
import { Settings, SETTINGS_ACCESS_KEY } from '../common/types/settings-types';
import { ref } from 'vue';
import { getDefaultSettings } from '../common/helpers/settings-helper';

export function useSettings() {
  const settings = ref<Settings>(getDefaultSettings(true));
  let store: Store;

  async function loadSettings() {
    store = await load('settings.json', { autoSave: false, createNew: true });

    if (!store) {
      console.error('Store not initialized');
      return;
    }

    const settings_result = await store.get<{ value: Settings }>(SETTINGS_ACCESS_KEY.USER_SETTINGS);
    settings.value = settings_result?.value ?? getDefaultSettings(true);
    return settings.value;
  }

  async function saveSettings() {
    if (!store) {
      console.error('Store not initialized');
      return;
    }

    await store.set(SETTINGS_ACCESS_KEY.USER_SETTINGS, settings.value);
    await store.save();
  }

  function setSettings(newSettings: Settings) {
    settings.value = { ...newSettings };
  }

  function resetSettings() {
    settings.value = { ...getDefaultSettings(true) };
  }

  function getCurrentSettings() {
    return settings.value;
  }

  return {
    settings,
    loadSettings,
    setSettings,
    resetSettings,
    saveSettings,
    getCurrentSettings
  }
}