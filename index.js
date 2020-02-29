const {
  app,
  Menu,
  ipcMain,
  nativeTheme,
  globalShortcut,
} = require('electron')
const isMac = /darwin/.test(process.platform)
const { menubar } = require('menubar');
const isDev = require('electron-is-dev')
const path = require('path')

console.log(`isDev: ${isDev}`)

const mb = menubar({
  dir: path.join(__dirname, '/app'),
  width: 440,
  height: 330,
  icon: path.join(__dirname, '/app/assets/icons/favicon.png'),
  preloadWindow: true,
  windowPosition: 'topRight',
  browserWindow: {
    webPreferences: {
      preload: path.join(__dirname, '/app/preload.js')
    }
  },
  alwaysOnTop: true
})

mb.app.on('show', function () {
  if (isDev) console.log('show')
  mb.window.webContents.send('show')
})

mb.app.on('will-quit', function () {
  if (isDev) console.log('will quit')
  globalShortcut.unregisterAll()
})

mb.app.on('activate', function () {
  if (isDev) console.log('activate')
  mb.showWindow()
})

const template = [
  {
    label: 'Emojibar',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'CommandOrControl+Z',
        selector: 'undo:'
      },
      {
        label: 'Redo',
        accelerator: 'Shift+CommandOrControl+Z',
        selector: 'redo:'
      },
      {
        label: 'Cut',
        accelerator: 'CommandOrControl+X',
        selector: 'cut:'
      },
      {
        label: 'Copy',
        accelerator: 'CommandOrControl+C',
        selector: 'copy:'
      },
      {
        label: 'Paste',
        accelerator: 'CommandOrControl+V',
        selector: 'paste:'
      },
      {
        label: 'Select All',
        accelerator: 'CommandOrControl+A',
        selector: 'selectAll:'
      },
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click: function (item, focusedWindow) { if (focusedWindow) focusedWindow.reload() }
      },
      {
        label: 'Preference',
        accelerator: 'CommandOrControl+,',
        click: function () { mb.window.webContents.send('open-preference') }
      },
      {
        label: 'Quit App',
        accelerator: 'CommandOrControl+Q',
        selector: 'terminate:'
      },
      {
        label: 'Toggle DevTools',
        accelerator: 'Alt+CommandOrControl+I',
        click: function () { mb.window.toggleDevTools() }
      }
    ]
  }
]

mb.on('ready', function ready () {
  if (isDev) {
    console.log('ready')
    mb.showWindow()
  }

  // Build default menu for text editing and devtools. (gone since electron 0.25.2)
  var menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  mb.window.on('hide', function () {
    mb.window.webContents.send('fetch')
  })
})

// when receive the abort message, close the app
ipcMain.on('abort', function () {
  if (isDev) console.log('abort')

  if (isMac) {
    mb.app.hide()
  } else {
    // Windows and Linux
    mb.window.blur()
    mb.hideWindow()
  }
})

mb.on('after-create-window', function () {
  if (isDev) mb.window.openDevTools()
})


// update shortcuts when preferences change
ipcMain.on('update-preference', function (evt, pref, initialization) {
  registerShortcut(pref['open-window-shortcut'], initialization)

  // Make packaged app (not dev app) start at login
  if (!isDev) {
    app.setLoginItemSettings({
      openAtLogin: pref['open-at-login'],
      openAsHidden: true
    })
  }
})

// Register a shortcut listener.
var registerShortcut = function (keybinding, initialization) {
  globalShortcut.unregisterAll()

  try {
    var ret = globalShortcut.register(keybinding, function () {
      if (mb.window.isVisible()) {
        return mb.hideWindow()
      }

      mb.showWindow()
      mb.window.focus()
    })
  } catch (err) {
    mb.window.webContents.send('preference-updated', false, initialization)
  }

  if (ret) {
    mb.window.webContents.send('preference-updated', true, initialization)
  }
}
