const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  openWavDialog: () => ipcRenderer.invoke('open-wav-dialog'),
  saveWavDialog: (base64data, name) => ipcRenderer.invoke('save-wav-dialog', base64data, name)
});
