// APP-wide electron object 
const electron = require('electron');

// Module to control application life.
const {app} = electron;

// Module to create native browser window.
const {BrowserWindow} = electron;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
// ----------
// In our case, we have 2 screens:
let screenNav;
let screenView;



/**
 * @function Create the NAVIGATION window
 */ 
function createNavigationWindow(options = {}) {
  // Create the browser window.
  screenNav = new BrowserWindow(options);

  // and load the index.html of the app.
  screenNav.loadURL(`file://${__dirname}/screens/screen-navigation.html`);


  // Open the DevTools.
  screenNav.webContents.openDevTools();

  // Emitted when the window is closed.
  screenNav.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    screenNav = null;
		screenView = null;
  });
}


/**
 * @function Create the EXPLORER window
 */
function createStreetViewWindow(options) {
  // Create the browser window.
  screenView = new BrowserWindow(options);

  // and load the index.html of the app.
  screenView.loadURL(`file://${__dirname}/screens/screen-streetview.html`);

  // Open the DevTools.
  screenView.webContents.openDevTools();

  // Emitted when the window is closed.
  screenView.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    screenView = null;
		screenNav = null;
  });

}


function openAppScreens() {	
	let displays = electron.screen.getAllDisplays();
	let externalDisplay = displays.find(function(display){
		if (display.bounds.x !== 0 || display.bounds.y !== 0) 
			return display;
	});

	let {mainWidth, mainHeight} = electron.screen.getPrimaryDisplay().workAreaSize;


	if (externalDisplay) {

		createNavigationWindow({
			width: mainWidth, height: mainHeight
		});

		createStreetViewWindow({ 
			width: 1280, height: 800, 
			x: externalDisplay.bounds.x + 50, 
			y: externalDisplay.bounds.y,
			frame: false
		});
	} else {
		createNavigationWindow({
			width: 800, height: 800
		});

		createStreetViewWindow({ 
			width: 800, height: 800
		});
	}
	
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function(){
	openAppScreens();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});
