export interface Settings {
  generalSettings: GeneralSettings;
  layoutSettings: LayoutSettings;
  hotkeySettings: HotKeySettings;
}

export interface HotKeySettings {
  enableGlobalHotkeys: boolean;
  globalHotkeys: GlobalHotKeyActions;
}

export interface GlobalHotKeyActions {
  start: number;
  split: number;
  stop: number;
  reset: number;
}

export interface GeneralSettings {
  darkMode: boolean;
}

export interface LayoutSettings {
  layout: string;
}
