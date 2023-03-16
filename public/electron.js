const electron = require('electron');
const { app, BrowserWindow, protocol } = electron;
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow = null;
app.on('ready', createWindow);
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
});

app.whenReady().then(() => {
  protocol.registerFileProtocol('file', (request, callback) => {
    const pathname = request.url.replace('file:///', '');
    callback(pathname);
  });
});

function createWindow() {
  mainWindow = new BrowserWindow({
    // width: 1024,
    // height: 1024,
    title: "SCGP Dashboard"
  });
  mainWindow.loadURL(isDev ? 'http://localhost:8080' : `file://${path.join(__dirname, '../dist/index.html')}`);
  mainWindow.on('closed', function () {
    mainWindow = null
  })
  mainWindow.on('page-title-updated', function (e) {
    e.preventDefault()
  });
}