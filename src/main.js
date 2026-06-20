const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 860,
    minWidth: 900,
    minHeight: 620,
    backgroundColor: '#0a0e13',
    title: 'Rohrbruch-Ortung v2.0',
    icon: path.join(__dirname, 'icon.ico'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  mainWindow.setMenuBarVisibility(false);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  app.quit();
});

// IPC: WAV-Datei öffnen via nativen Dialog
ipcMain.handle('open-wav-dialog', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: 'WAV-Aufnahme laden',
    filters: [
      { name: 'Audio-Dateien', extensions: ['wav', 'WAV', 'mp3', 'ogg', 'flac', 'm4a'] },
      { name: 'Alle Dateien', extensions: ['*'] }
    ],
    properties: ['openFile']
  });
  if (result.canceled || !result.filePaths.length) return null;
  const filePath = result.filePaths[0];
  const buffer = fs.readFileSync(filePath);
  return {
    name: path.basename(filePath),
    path: filePath,
    data: buffer.toString('base64'),
    size: buffer.length
  };
});

// IPC: Verarbeitete WAV speichern
ipcMain.handle('save-wav-dialog', async (event, base64data, suggestedName) => {
  const result = await dialog.showSaveDialog(mainWindow, {
    title: 'Optimierte WAV speichern',
    defaultPath: suggestedName || 'optimiert.wav',
    filters: [{ name: 'WAV-Datei', extensions: ['wav'] }]
  });
  if (result.canceled || !result.filePath) return false;
  const buf = Buffer.from(base64data, 'base64');
  fs.writeFileSync(result.filePath, buf);
  return result.filePath;
});
