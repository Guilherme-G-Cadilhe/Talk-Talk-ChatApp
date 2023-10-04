import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware'
import NotificationUtils from '../utils/notifications';
import * as apiConnection from '../api/connection';
import { useSettingsStore } from './settings';

export const onlineNotificatorMiddleware = (state, previousState) => {
  const { showNotifications } = useSettingsStore.getState()
  if (showNotifications) {
    if (state !== previousState) {
      NotificationUtils.show({
        title: 'Connection status:',
        body: state ? 'Online' : 'Offline'
      })
    }
  }

}



export const useOnlineStatusStore = create(
  subscribeWithSelector((set, get) => ({
    isOnline: navigator.onLine,
    addWindowEventListener: (eventName, handler) => window.addEventListener(eventName, handler),
    removeWindowEventListener: (eventName, handler) => window.removeEventListener(eventName, handler),
    checkUserConnection: (uid) => apiConnection.onConnectionChanged((isConnected) => apiConnection.setUserOnlineStatus(uid, isConnected))
  })),
)


