const { contextBridge, ipcRenderer } = require('electron')


contextBridge.exposeInMainWorld('e_notification', {
  send: (message) => ipcRenderer.send('notify', message)
})