const { app, BrowserWindow } = require('electron');
const path = require('path');
const { exec } = require('child_process');
const axios = require('axios');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile(path.join(__dirname, 'dist', 'index.html'));
}

function startFlaskServer() {
  return new Promise((resolve, reject) => {
    const pythonPath = path.join(__dirname, 'venv', 'Scripts', 'python.exe'); // Adjust for your OS
    const scriptPath = path.join(__dirname, 'src', 'python', 'app.py');

    console.log(`Starting Flask server at: ${scriptPath} with Python interpreter: ${pythonPath}`);

    const flaskProcess = exec(`${pythonPath} ${scriptPath}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error starting Flask server: ${error.message}`);
        reject(error);
        return;
      }
      if (stderr) {
        console.error(`Flask stderr: ${stderr}`);
        return;
      }
      console.log(`Flask stdout: ${stdout}`);
    });

    flaskProcess.on('exit', (code) => {
      console.log(`Flask process exited with code ${code}`);
    });

    // Poll the Flask server until it's ready
    const pollServer = () => {
      axios.get('http://localhost:5000/say-hello')
        .then(() => {
          console.log('Flask server is ready');
          resolve();
        })
        .catch(() => {
          setTimeout(pollServer, 1000);
        });
    };
    pollServer();
  });
}

app.whenReady().then(async () => {
  try {
    await startFlaskServer();
    createWindow();
  } catch (error) {
    console.error('Failed to start Flask server:', error);
  }
});

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
