/** 
 * To run locally in continous development( nodemon ) use:
 * - "npx electronmon ."
 */
const { app, BrowserWindow, ipcMain, Notification, Menu, Tray } = require('electron');
const path = require('path');
const dockIcon = path.join(__dirname, '../../assets/images/talktalk.png')
const trayIcon = path.join(__dirname, '../../assets/images/talktalk.png')

// const isDev = process.env.NODE_ENV !== 'production';
const isDev = !app.isPackaged
const isMac = process.platform === 'darwin'
let mainWindow = null;
let splashWindow = null;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: 'Talk Talk',
    width: isDev ? 1400 : 800,
    height: 600,
    backgroundColor: "#6e707e",
    show: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    }
  });
  if (isDev) mainWindow.webContents.openDevTools()
  mainWindow.loadFile(path.join(__dirname, '../renderer/html/index.html'));
}

function createSplashWindow() {
  splashWindow = new BrowserWindow({
    title: 'Loading TalkTalk',
    width: 400,
    height: 200,
    frame: false,
    transparent: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
    }
  });
  splashWindow.loadFile(path.join(__dirname, '../renderer/html/splash.html'));
}

if (process.platform === 'darwin') app.dock.setIcon(dockIcon)
let tray = null;

app.whenReady().then(() => {
  const template = require('../../utils/Menu').createTemplate(app);
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  tray = new Tray(trayIcon);
  tray.setContextMenu(menu)

  createMainWindow();
  createSplashWindow()

  mainWindow.once('ready-to-show', () => {
    // splashWindow?.destroy();
    // mainWindow.show();
    setTimeout(() => {
      splashWindow?.destroy();
      mainWindow.show();
    }, 1000)
  })

  mainWindow.on('closed', () => mainWindow = null)
  splashWindow.on('closed', () => splashWindow = null)
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow()
    }
  })
});

ipcMain.on('notify', (_, message) => {
  new Notification({ title: 'Notification', body: message }).show();
})
ipcMain.on('app-quit', (_) => {
  app.quit();
})

app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit();
  }
})


/** Webpack -> Module Builder, main purpose is to bundle JS Files for usage in Browser
 * Babel ->  Is a JS Compiler to transform current JS into Low Base JS
 * 
 */