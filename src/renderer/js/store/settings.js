import { create } from 'zustand';
import Storage from '../utils/storage';

export const useSettingsStore = create(
  (set, get) => ({
    isDarkTheme: false,
    showNotifications: true,
    playSound: true,
    updateSettings: (input, bool) => {
      const currentSettings = Storage.getItem('app-settings');
      const settings = { ...currentSettings, [input]: bool }
      Storage.setItem('app-settings', settings);
      set((state) => ({ ...state, ...settings }));
    },
    loadInitialSettings: () => {
      const currentSettings = Storage.getItem('app-settings');
      set((state) => ({ ...state, ...currentSettings }));
    }
  }));