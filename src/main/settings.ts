import { App } from "electron";
import fs from "fs";
import { Settings } from "../common/types/settings-types";
import { getDefaultSettings } from "../common/helpers/settings-helper";

enum SYSTEM_FILE_PATHS {
  USER_SETTINGS = '/user_settings.json',
}

export async function loadSettings(app: App): Promise<Settings> {
  return new Promise((resolve, reject) => {
    try {
      fs.readFile(app.getPath('userData') + SYSTEM_FILE_PATHS.USER_SETTINGS, 'utf-8', async (err, data) => {
        if (err) {
          console.log("Settings file not found");
          const defaultSettings = getDefaultSettings(false);
          await writeSettings(app, defaultSettings);
          resolve(defaultSettings);
        } else {
          console.log("Settings file found");
          resolve(JSON.parse(data) as Settings);
        }
      });
    }
    catch (err) {
      console.error("Error loading settings file");
      reject(err);
    }
  });
}

export async function writeSettings(app: App, settings: Settings): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      fs.writeFile(
        app.getPath('userData') + SYSTEM_FILE_PATHS.USER_SETTINGS, 
        JSON.stringify(settings), () => {
          console.log("Settings file written");
          resolve();
        }
      );
    }
    catch (err) {
      reject(err);
    }
  });
}