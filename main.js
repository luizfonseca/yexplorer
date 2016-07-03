let DEBUG = true;

// APP-wide electron object 
const electron = require('electron');

// Module to control application life.
const {app} = electron;

// Inter-process communication between 2 or more windows
const {ipcMain}	= electron; 

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

	if (DEBUG) {
	  // Open the DevTools.
		screenNav.webContents.openDevTools();
	}

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
	
	if (DEBUG) {
		// Open the DevTools.
	  screenView.webContents.openDevTools();
	}

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

	const {mainWidth, mainHeight} = electron.screen.getPrimaryDisplay().workAreaSize;


	if (externalDisplay) {
		createNavigationWindow({
			width: mainWidth, height: mainHeight, frame: false, 
			kiosk: true, allowRunningInsecureContent: true
		});

		createStreetViewWindow({ 
			width: 1280, height: 800, 
			x: externalDisplay.bounds.x, 
			y: externalDisplay.bounds.y,
			frame: false, allowRunningInsecureContent: true
		});

	} else {
		createNavigationWindow({
			width: 800, height: 800, allowRunningInsecureContent: true
		});

		createStreetViewWindow({ 
			width: 800, height: 800, allowRunningInsecureContent: true
		});
	}
	
}

function triggerKeyboard(direction) {

		var opts = { type: "keyDown",	keyCode: '\u0008' }
		console.log(direction);
		switch(direction) {

			case "top":
				opts = { type: "keyDown",	keyCode: 'Up' };
				break;
			case "left":
				opts = { type: "keyDown",	keyCode: 'Left' };								
				break;
			case "right":
				opts = { type: "keyDown",	keyCode: 'Right' };
				break
			case "bottom":
				opts = { type: "keyDown",	keyCode: 'Down' };			
				break;
			default:
				opts = { type: "keyDown",	keyCode: '\u0013' }								
				break;
		}

		console.log(opts);
		screenView.webContents.sendInputEvent(opts);
		opts.type = "keyUp";
		screenView.webContents.sendInputEvent(opts);
}


/* ----------- EVENTs -------------*/

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
  if (screenNav === null && screenView === null) {
    openAppScreens();
  }
});


/**
 * Building a Relay system with the IPC feature
 * The main process just receive and send the msg back
 */
ipcMain.on('screenView', function(event, msg){
	console.log(msg);

	if (msg.type == 'direction')
		triggerKeyboard(msg.data);

	screenView.webContents.send('screenView-reply', msg);
});

ipcMain.on('screenNav', function(event, msg){
	console.log(msg);
	screenNav.webContents.send('screenNav-reply', msg);
});
