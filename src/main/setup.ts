import { App, BrowserWindow, ipcMain } from "electron";
import { TimerCommands } from "../common/types/timer-commands";
import { loadSettings, writeSettings } from "./settings";
import { uIOhook } from "uiohook-napi";
import { convertKeycodeFromUiohook } from "../common/helpers/keycode-converter";
import path from "path";
import { Settings } from "../common/types/settings-types";

export async function initApp(mainWindow: BrowserWindow, app: App) {

  // Handle new child windows
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    return {
      action: 'allow',
      overrideBrowserWindowOptions: {
        frame: true,
        fullscreenable: true,
        webPreferences: {
          preload: path.join(__dirname, 'preload.js'),
          nodeIntegration: true,
        },
      }
    }
  })

  // Load user settings
  const settings = await loadSettings(app);
  
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
    return await loadSettings(app);
  });

  ipcMain.handle('set-settings', async (event, settings: Settings) => {
    await writeSettings(app, settings).catch((err) => {
      console.error('Error writing to settings file:', err);
      return false;
    });

    return true;
  });

  ipcMain.on('open-dev-tools', (event) => {
    console.log('Opening DevTools');
    event.sender.openDevTools();
  });
}