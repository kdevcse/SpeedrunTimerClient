import { App, BrowserWindow, ipcMain } from "electron";
import { TimerCommands } from "../common/types/timer-commands";
import { loadUserSettings } from "./settings";
import { UiohookKey, uIOhook } from "uiohook-napi";

export async function initApp(mainWindow: BrowserWindow, app: App) {
  // Load user settings
  const settings = await loadUserSettings(app);

  uIOhook.on("keydown", (e) => {
    if (e.keycode === UiohookKey[1]) {
      mainWindow.webContents.send("global-timer", TimerCommands.START);
    }
    if (e.keycode === settings.hotkeySettings.globalHotkeys.split) {
      mainWindow.webContents.send("global-timer", TimerCommands.SPLIT);
    }
    if (e.keycode === settings.hotkeySettings.globalHotkeys.stop) {
      mainWindow.webContents.send("global-timer", TimerCommands.STOP);
    }
    if (e.keycode === settings.hotkeySettings.globalHotkeys.reset) {
      mainWindow.webContents.send("global-timer", TimerCommands.RESET);
    }
  });

  ipcMain.handle('get-settings', async () => {
    return await loadUserSettings(app);
  });

  uIOhook.start();
}