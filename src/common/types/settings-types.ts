export interface Settings {
  generalSettings: GeneralSettings;
  layoutSettings: LayoutSettings;
  hotkeySettings: HotKeySettings;
}

export interface HotKeySettings {
  enableGlobalHotkeys: boolean;
  globalHotkeys: {
    start: number;
    split: number;
    stop: number;
    reset: number;
  };
}

export interface GeneralSettings {
  darkMode: boolean;
}

export interface LayoutSettings {
  layout: string;
}

export const defaultSettings: Settings = {
  generalSettings: {
    darkMode: true,
  },
  layoutSettings: {
    layout: 'default',
  },
  hotkeySettings: {
    enableGlobalHotkeys: true,
    globalHotkeys: {
      start: 2, //UiohookKey[1]
      split: 3, //UiohookKey[2]
      stop: 4, //UiohookKey[3]
      reset: 5, //UiohookKey[4]
    },
  },
};

