import { App, BrowserWindow, globalShortcut } from "electron";
import { TimerCommands } from "../common/types/timer-commands";
import { loadUserSettings } from "./settings";

export async function initApp(mainWindow: BrowserWindow, app: App) {
  // Load user settings
  const userSettings = await loadUserSettings(app);

  // Register global hotkeys
  globalShortcut.register(userSettings.globalHotkeys.start, () => {
    mainWindow.webContents.send("global-timer", TimerCommands.START);
  });
  globalShortcut.register(userSettings.globalHotkeys.split, () => {
    mainWindow.webContents.send("global-timer", TimerCommands.SPLIT);
  });
  globalShortcut.register(userSettings.globalHotkeys.stop, () => {
    mainWindow.webContents.send("global-timer", TimerCommands.STOP);
  });
  globalShortcut.register(userSettings.globalHotkeys.reset, () => {
    mainWindow.webContents.send("global-timer", TimerCommands.RESET);
  });
}