import { load, Store } from '@tauri-apps/plugin-store'; //https://v2.tauri.app/plugin/store
import { Settings, SETTINGS_ACCESS_KEY } from '../common/types/settings-types';
import { getDefaultSettings } from '../common/helpers/settings-helper';

let settingsStore: Store;

export function useSettings() {
  async function loadSettings() {
    if (settingsStore) {
      return;
    }

    try {
      settingsStore = await load('settings.json', { autoSave: false });
    } catch (error) {
      console.error('Error initializing settings store', error);
    }
  }

  async function getSettings() {
    if (!settingsStore) {
      console.error('Store not initialized');
      return getDefaultSettings(true);
    }

    const settings = await settingsStore.get<Settings>(SETTINGS_ACCESS_KEY.USER_SETTINGS);
    return settings ?? getDefaultSettings(true);
  }

  async function setSettings(settings: Settings) {
    if (!settingsStore) {
      console.error('Store not initialized');
      return;
    }

    await settingsStore.set(SETTINGS_ACCESS_KEY.USER_SETTINGS, settings);
  }

  async function resetSettings() {
    await settingsStore.set(SETTINGS_ACCESS_KEY.USER_SETTINGS, getDefaultSettings(true));
  }

  async function saveSettings() {
    if (!settingsStore) {
      console.error('Store not initialized');
      return false;
    }

    await settingsStore.save();
    return true;
  }

  async function teardownSettings() {
    if (!settingsStore) {
      console.error('Store not initialized');
      return;
    }

    await settingsStore.close();
  }

  const SAVED_SETTINGS_EVENT = 'SETTINGS_SAVED';

  return {
    SAVED_SETTINGS_EVENT,
    settingsStore,
    loadSettings,
    getSettings,
    setSettings,
    resetSettings,
    saveSettings,
    teardownSettings
  }
}