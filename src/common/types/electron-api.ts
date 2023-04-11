export const ELECTRON_API_NAME = 'electronAPI';

export interface ElectronApiWindow extends Window {
  electronAPI: ElectronApi
}

export interface ElectronApi {
  listenForTimerCommands: (listener: TimerCommandListener) => void;
}

export type TimerCommandListener = (_: any, event: Electron.IpcRendererEvent) => void;