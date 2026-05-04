const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = !app.isPackaged;

function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false, // Set to false for simpler access to Node APIs if needed, though security best practices recommend true
        },
        icon: path.join(__dirname, 'favicon.ico'), // Assuming favicon.ico exists in public
    });

    // Load the app
    win.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    ).catch(err => console.error('Failed to load URL:', err));

    // Remove the default File/Edit/View menu bar so users can't open DevTools manually
    win.removeMenu();

    // Open the DevTools in development mode.
    if (isDev) {
        win.webContents.openDevTools({ mode: 'detach' });
    }

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object
    });
}

// This method will be called when Electron has finished initialization
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
