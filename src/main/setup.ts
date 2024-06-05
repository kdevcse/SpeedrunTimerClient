import { App, BrowserWindow, ipcMain } from "electron";
import { TimerCommands } from "../common/types/timer-commands";
import { loadUserSettings } from "./settings";
import { uIOhook } from "uiohook-napi";
import { convertKeycodeFromUiohook } from "../common/helpers/keycode-converter";

export async function initApp(mainWindow: BrowserWindow, app: App) {
  // Load user settings
  const settings = await loadUserSettings(app);
  
  uIOhook.on("keydown", (e) => {
    try {
      const keycode = convertKeycodeFromUiohook(e.keycode, false);
      if (keycode === settings.hotkeySettings.globalHotkeys.start) {
        mainWindow.webContents.send("global-timer", TimerCommands.START);
      }
      if (keycode === settings.hotkeySettings.globalHotkeys.split) {
        mainWindow.webContents.send("global-timer", TimerCommands.SPLIT);
      }
      if (keycode === settings.hotkeySettings.globalHotkeys.stop) {
        mainWindow.webContents.send("global-timer", TimerCommands.STOP);
      }
      if (keycode === settings.hotkeySettings.globalHotkeys.reset) {
        mainWindow.webContents.send("global-timer", TimerCommands.RESET);
      }
    }
     catch (error) {
      // Important: Don't let the app crash if there's an error in the event handler
      // It's likely that an error is due to an invalid settings file
      // TODO: we need to create a file settings validation function
      console.error(error);
    }
  });

  uIOhook.start();

  ipcMain.handle('get-settings', async () => {
    return await loadUserSettings(app);
  });
}