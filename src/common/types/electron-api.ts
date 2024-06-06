import { Settings } from "./settings-types";

export const ELECTRON_API_NAME = 'electronAPI';

export interface ElectronApiWindow extends Window {
  electronAPI: ElectronApi
}

export interface ElectronApi {
  listenForTimerCommands: (listener: TimerCommandListener) => void;
  getSettings(): Promise<Settings>;
  setSettings(settings: Settings): Promise<boolean>;
}

export type TimerCommandListener = (_: unknown, event: Electron.IpcRendererEvent) => void;