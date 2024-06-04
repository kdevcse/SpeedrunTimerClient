import { App } from "electron";
import fs from "fs";
import { UiohookKey } from "uiohook-napi";

interface UserSettings {
  darkMode: boolean;
  enableGlobalHotkeys: boolean;
  globalHotkeys: {
    start: any;
    split: number;
    stop: number;
    reset: number;
  };
}

enum SYSTEM_FILE_PATHS {
  USER_SETTINGS = '/user_settings.json',
}

const defaultSettings: UserSettings = {
  darkMode: false,
  enableGlobalHotkeys: true,
  globalHotkeys: {
    start: UiohookKey[1],
    split: UiohookKey[2],
    stop: UiohookKey[3],
    reset: UiohookKey[4],
  },
};

export async function loadUserSettings(app: App): Promise<UserSettings> {
  return new Promise((resolve, reject) => {
    try {
      fs.readFile(app.getPath('userData') + SYSTEM_FILE_PATHS.USER_SETTINGS, 'utf-8', async (err, data) => {
        if (err) {
          console.log("User settings file not found");
          await writeUserSettings(app, defaultSettings);
          resolve(defaultSettings);
        } else {
          console.log("User settings file found");
          resolve(JSON.parse(data) as UserSettings);
        }
      });
    }
    catch (err) {
      console.error("Error loading user settings file");
      reject(err);
    }
  });
}

export async function writeUserSettings(app: App, settings: UserSettings): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      fs.writeFile(
        app.getPath('userData') + SYSTEM_FILE_PATHS.USER_SETTINGS, 
        JSON.stringify(settings), () => {
          console.log("Default user settings file written");
          resolve();
        }
      );
    }
    catch (err) {
      reject(err);
    }
  });
}