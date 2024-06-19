import { Settings } from "../types/settings-types";
import { convertKeycodeFromUiohook } from "./keycode-converter";

export function getDefaultSettings(isRenderer: boolean): Settings {
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