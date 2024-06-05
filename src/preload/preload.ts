// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';
import { ElectronApi, TimerCommandListener, ELECTRON_API_NAME } from '../common/types/electron-api';

contextBridge.exposeInMainWorld(ELECTRON_API_NAME, {
  listenForTimerCommands: (listener: TimerCommandListener) => ipcRenderer.on('global-timer', listener),
  getSettings: () => ipcRenderer.invoke('get-settings'),
} as ElectronApi);