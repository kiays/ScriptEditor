const { BrowserWindow, ipcMain, app } = require("electron");

let mainWindow;
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  mainWindow.webContents.on("select-bluetooth-device", (event, deviceList, callback) => {
    console.log("select bluetooth device callback");
    event.preventDefault();
    if (deviceList && deviceList.length > 0) {
      console.log(deviceList);
      callback(deviceList[0].deviceId);
    }
  });
  mainWindow.loadFile("dist/index.html");
};

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", async () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("before-quit", async (e) => {
  console.log("before quit");
  mainWindow.send("quit");
  e.preventDefault();
  return new Promise((res) => {
    console.log("send quit");
    setTimeout(() => {
      app.exit();
    }, 1000);
  });
});
