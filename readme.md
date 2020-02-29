# Emojibar

A fork of [Mojibar](https://github.com/muan/mojibar) for Linux

## Changes compared to Mojibar

- Updated all dependencies, from `electron@^1.6.0` to `electron@^8.02` ⬆️
- Improved Searchbox UI
- New settings page
  - Added support for dark mode (according to system ui preferences)

## Notes

Support for Windows and OSX is not mantained, if wanna help as a contributor, Issues & PRs are welcome!

## Install

### Linux

#### :triangular_flag_on_post: Download and drag

[Download the latest version for Linux on the releases page](https://github.com/muan/mojibar/releases) (and drag into your apps folder.)

You can use it without install any font, but the not all emoji will work, to get all emoji list you can try these approach:

1. **Color** – Follow [these instructions](http://stdio.tumblr.com/post/114082931782)
1. **Black and White** – Download this [emoji font](https://github.com/eosrei/emojione-color-font)

## Usage

<kbd>control + shift + space</kbd><br>
Open app.

<kbd>command/control + ,</kbd><br>
Open preference (while window is open).

<kbd>👆/👇/👈/👉</kbd><br>
Navigate between emojis.

<kbd>enter</kbd><br>
Copy emoji unicode char and exit. For example: `💩`.

<kbd>shift + enter</kbd><br>
Copy emoji code and exit. For example: `:poop:`.

<kbd>space</kbd><br>
Next page.

<kbd>shift + space</kbd><br>
Previous page.

<kbd>/</kbd><br>
Jump to the search field.

<kbd>esc</kbd><br>
Exit.

<kbd>command/control + q</kbd><br>
Quit Mojibar (while window is open).

## Build

:construction:

```
$ git clone https://github.com/muan/mojibar.git
$ cd mojibar
$ npm install
$ npm start
```

## Built with

- [maxogden/menubar](https://github.com/maxogden/menubar)
- [muan/emojilib](https://github.com/muan/emojilib)

## :heart:
