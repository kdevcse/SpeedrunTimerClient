import { App, BrowserWindow, ipcMain } from "electron";
import { TimerCommands } from "../common/types/timer-commands";
import { loadUserSettings } from "./settings";
import { uIOhook } from "uiohook-napi";
import { convertKeycodeFromUiohook } from "../common/helpers/keycode-converter";

export async function initApp(mainWindow: BrowserWindow, app: App) {
  // Load user settings
  const settings = await loadUserSettings(app);

  uIOhook.on("keydown", (e) => {
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
  });

  ipcMain.handle('get-settings', async () => {
    return await loadUserSettings(app);
  });

  uIOhook.start();
}