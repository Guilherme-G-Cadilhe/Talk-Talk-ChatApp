/** 
 * To run locally in continous development( nodemon ) use:
 * - "npx electronmon ."
 */
const { app, BrowserWindow } = require('electron');
const path = require('path');

const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin'
let mainWindow = null;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: 'Talk Talk',
    width: isDev ? 1400 : 800,
    height: 600,
    backgroundColor: "white",
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    }
  });
  // Open DevTools if in DEV Env
  if (isDev) {
    mainWindow.webContents.openDevTools()
  }
  mainWindow.loadFile(path.join(__dirname, '../renderer/html/index.html'));
}

app.whenReady().then(() => {
  createMainWindow();

  // Remove MainWindow from memory on close
  mainWindow.on('closed', () => mainWindow = null)
  // If window didnt load properly
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow()
    }
  })
});

// If operating System isnt MAC, ensure the app closes.
app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit()
  }
})


/** Webpack -> Module Builder, main purpose is to bundle JS Files for usage in Browser
 * Babel ->  Is a JS Compiler to transform current JS into Low Base JS
 * 
 */