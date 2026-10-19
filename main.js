const { app, BrowserWindow, Menu, dialog, shell, ipcMain } = require('electron');
const path = require('path');

const APP_TITLE = 'PDF Editor Pro';
app.setName(APP_TITLE);

let mainWindow = null;

function sendMenuAction(action) {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('menu-action', action);
  }
}

function buildMenu() {
  const template = [
    {
      label: 'Archivo',
      submenu: [
        { label: 'Añadir PDF(s)…', accelerator: 'CmdOrCtrl+O', click: () => sendMenuAction('open-files') },
        { label: 'Exportar PDF…', accelerator: 'CmdOrCtrl+S', click: () => sendMenuAction('export') },
        { type: 'separator' },
        { label: 'Salir', role: 'quit' },
      ],
    },
    {
      label: 'Edición',
      submenu: [
        { label: 'Deshacer', click: () => sendMenuAction('undo') },
        { label: 'Rehacer', click: () => sendMenuAction('redo') },
      ],
    },
    {
      label: 'Ver',
      submenu: [
        { label: 'Acercar', click: () => sendMenuAction('zoom-in') },
        { label: 'Alejar', click: () => sendMenuAction('zoom-out') },
        { type: 'separator' },
        { role: 'togglefullscreen', label: 'Pantalla completa' },
        { role: 'reload', label: 'Recargar' },
        { role: 'toggleDevTools', label: 'Herramientas de desarrollo' },
      ],
    },
    {
      label: 'Ayuda',
      submenu: [
        {
          label: 'Repositorio en GitHub',
          click: () => shell.openExternal('https://github.com/melvinfranco99/pdf-editor-pro-desktop'),
        },
        {
          label: 'Acerca de PDF Editor Pro',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'Acerca de PDF Editor Pro',
              message: APP_TITLE,
              detail: `Versión ${app.getVersion()}\nEditor de PDFs de escritorio: unir, reordenar, dibujar, resaltar, escribir, firmar y exportar.\nTodo se procesa en tu propio ordenador, sin subir tus archivos a ningún servidor.`,
            });
          },
        },
      ],
    },
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 900,
    minHeight: 600,
    title: APP_TITLE,
    icon: path.join(__dirname, 'build', 'icon.png'),
    backgroundColor: '#f4f5f7',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
    show: false,
  });

  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));
  mainWindow.once('ready-to-show', () => mainWindow.show());

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

ipcMain.handle('get-app-title', () => APP_TITLE);

app.whenReady().then(() => {
  buildMenu();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
