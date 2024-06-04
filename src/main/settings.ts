import { App } from "electron";
import fs from "fs";

interface UserSettings {
  darkMode: boolean;
  enableGlobalHotkeys: boolean;
  globalHotkeys: {
    start: string;
    split: string;
    stop: string;
    reset: string;
  };
}

enum SYSTEM_FILE_PATHS {
  USER_SETTINGS = '/user_settings.json',
}

const defaultSettings: UserSettings = {
  darkMode: false,
  enableGlobalHotkeys: true,
  globalHotkeys: {
    start: "1",
    split: "2",
    stop: "3",
    reset: "4",
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
          return JSON.parse(data) as UserSettings;
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