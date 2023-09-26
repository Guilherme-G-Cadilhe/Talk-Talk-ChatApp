import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware'
import NotificationUtils from '../utils/notifications';
import * as apiConnection from '../api/connection';

export const onlineNotificatorMiddleware = (state, previousState) => {
  if (state !== previousState) {
    NotificationUtils.show({
      title: 'Connection status:',
      body: state ? 'Online' : 'Offline'
    })
  }
}



export const useOnlineStatusStore = create(
  subscribeWithSelector((set, get) => ({
    isOnline: navigator.onLine,
    addWindowEventListener: (eventName, handler) => window.addEventListener(eventName, handler),
    removeWindowEventListener: (eventName, handler) => window.removeEventListener(eventName, handler),
    checkUserConnection: () => apiConnection.onConnectionChanged((isConnected) => {
      console.log('isConnected :>> ', isConnected);
    })
  })),
)



// const onlineNotificatorMiddleware = (config) => (set, get, api) => {
//   console.log('api :>> ');
//   return config(
//     (...args) => {
//       console.log('  applying', args)
//       set(...args)
//       console.log('  new state', get())
//     },
//     get,
//     api
//   )
// }

