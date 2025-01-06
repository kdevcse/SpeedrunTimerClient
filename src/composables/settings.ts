import { load, Store } from '@tauri-apps/plugin-store'; //https://v2.tauri.app/plugin/store
import { Settings, SETTINGS_ACCESS_KEY } from '../common/types/settings-types';
import { convertKeycodeFromUiohook } from "../common/helpers/keycode-converter";
import { ref } from 'vue';

export function useSettings() {
  const settings = ref<Settings>(getDefaultSettings(true));
  let store: Store;

  function getDefaultSettings(isRenderer: boolean): Settings {
    return {
      generalSettings: {
        darkMode: true,
      },
      layoutSettings: {
        layout: 'default',
      },
      hotkeySettings: {
        enableGlobalHotkeys: true,
        globalHotkeys: {
          start: convertKeycodeFromUiohook(2, isRenderer), //UiohookKey[1]
          split: convertKeycodeFromUiohook(3, isRenderer), //UiohookKey[2]
          stop: convertKeycodeFromUiohook(4, isRenderer), //UiohookKey[3]
          reset: convertKeycodeFromUiohook(5, isRenderer), //UiohookKey[4]
        },
      },
    };
  }

  async function loadSettings() {
    store = await load('settings.json', { autoSave: false, createNew: true });

    if (!store) {
      console.error('Store not initialized');
      return;
    }

    const settings_result = await store.get<{ value: Settings }>(SETTINGS_ACCESS_KEY.USER_SETTINGS);
    settings.value = settings_result?.value ?? getDefaultSettings(true);
  }

  async function saveSettings() {
    if (!store) {
      console.error('Store not initialized');
      return;
    }

    await store.set(SETTINGS_ACCESS_KEY.USER_SETTINGS, settings.value);
  }

  async function setSettings(newSettings: Settings) {
    settings.value = { ...newSettings };
  }

  function resetSettings() {
    settings.value = { ...getDefaultSettings(true) };
  }

  return {
    settings,
    loadSettings,
    setSettings,
    resetSettings,
    saveSettings,
  }
}