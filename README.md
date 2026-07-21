# ✦ PickWheel

**A beautiful, endlessly customizable picker wheel — for desktop or your browser.**

Weighted odds, real sound design, per-item images, dozens of color palettes, and a proper offline desktop app. No account, no server, no ads — everything lives on your own machine.

<!--
  TODO: replace with a real screenshot or short GIF once the app is built.
  A 3-4 shot GIF (spin → winner banner → items panel → sounds panel) works well here.
-->
![PickWheel screenshot](docs/screenshot.png)

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
![Platforms](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux%20%7C%20Web-informational)
![Built with Electron](https://img.shields.io/badge/built%20with-Electron-47848F?logo=electron&logoColor=white)

---

## Try it now

No download needed — the web version runs entirely in your browser, with the same features as the desktop app.

**👉 [Open PickWheel in your browser](https://godspeedkil.github.io/pickwheel/)**

Your wheels, sounds, and images are saved locally in your browser and never leave your machine.

---

## Download the desktop app

| Platform | Installer | Portable |
|---|---|---|
| 🪟 Windows | [`PickWheel-Setup.exe`](../../releases/latest) | [`PickWheel-Portable.exe`](../../releases/latest) — no install, runs from anywhere (USB stick friendly) |
| 🍎 macOS | [`PickWheel.dmg`](../../releases/latest) | [`PickWheel-mac.zip`](../../releases/latest) — unzip and run |
| 🐧 Linux | — | [`PickWheel.AppImage`](../../releases/latest) — no install, just `chmod +x` and run |

All builds are produced automatically from this repo — see [Building from source](#building-from-source) if you'd rather build it yourself.

> **Portable mode:** the portable Windows build and the macOS `.zip` keep all their data (wheels, sounds, images, settings) in a folder next to the app itself, instead of your system's user profile. Copy the app to a USB stick or another computer and everything comes with it.

---

## Features

**The wheel**
- Weighted items — bigger weight, bigger slice, exact odds every time
- Cancel a spin mid-animation by clicking Spin again
- Adjustable spin duration (2–30s), speed, easing style, resting angle (with an option to randomize it every spin)
- Optional idle spin — the wheel drifts slowly when it's just sitting there, purely for looks, never produces a result
- Configurable label length and auto-scaling text so more of your item names actually show on the wheel

**Items**
- Add items one at a time, or paste a batch list (`Name, weight` per line)
- Shuffle order, per-item custom colors, and an optional image per item
- No hard limits on item count or name length

**Colors**
- 24 built-in palettes across six themes: Vibrant, Pastel, Seasonal, Holiday, Elegant, and Nature
- A "Trending" theme and a "Timeless" theme (Flat UI Colors, Material Design, Solarized, Monokai, Crayola's original 1903 box, Bauhaus, Memphis Milano, iOS system colors, and 25 years of Pantone Colors of the Year)
- Build and save your own palettes

**Sound**
- 50+ generated sound effects across three categories (spin whir, tick, win fanfare) — fully synthesized, no audio files required
- Or upload your own clips (multiple per category — one is picked at random each spin), MP3/WAV/OGG and more

**The winner popup**
- Optional image per item, shown when it wins — five layout options (left/right/top/bottom/background), adjustable size and opacity, crop/fit/stretch modes
- Stays open until you dismiss it — never disappears on its own mid-glance

**Everything else**
- Save named wheel configurations and reload them instantly
- Full spin history with a frequency tally
- Six title fonts and an adjustable size for the wheel name
- Export/import your entire setup as a single backup file

---

## Building from source

**Requirements:** [Node.js](https://nodejs.org/) 18+ and npm.

```bash
git clone https://github.com/godspeedkil/pickwheel.git
cd pickwheel
npm install

# run the desktop app in development mode
npm run dev

# or just try the web version — open app/index.html in any browser
```

### Producing installers

```bash
npm run build          # builds for your current OS
npm run build:win       # Windows installer + portable .exe
npm run build:mac       # macOS .dmg + .zip
npm run build:linux     # Linux .AppImage
```

Output lands in `dist/`. These are the same commands the GitHub Actions release workflow runs automatically on every tagged version.

---

## Project structure

```
pickwheel/
├── app/                  # the app itself — runs standalone in any browser
│   ├── index.html
│   ├── styles.css
│   ├── app.js             # wheel, items, palettes, sounds, settings, history
│   └── storage-web.js     # IndexedDB storage backend (web + fallback)
├── electron/
│   ├── main.js             # window creation, app lifecycle
│   ├── preload.js          # exposes only get/set/delete to the page — nothing else
│   └── storage-main.js     # file-based storage backend (installed + portable modes)
├── build/icons/           # app icons per platform
└── .github/workflows/     # CI: builds installers on every release tag
```

The web and desktop builds share the exact same `app/` code. Only the storage backend swaps underneath — the app itself can't tell which one it's talking to.

---

## Your data

Everything — wheels, sounds, images, palettes, settings, history — is stored **only on your own device**. There's no server, no account, and no analytics. Nothing is ever uploaded anywhere.

Use **Settings → Export backup** any time to save everything to a single file, and **Import backup** to restore it (or move it to another machine).

---

## Tech stack

Vanilla HTML/CSS/JS — no framework, no build step required to just run it. [Electron](https://www.electronjs.org/) for the desktop wrapper, [electron-builder](https://www.electron.build/) for packaging, Web Audio API for all sound synthesis, and Canvas for the wheel itself.

---

## How this was built

Most of PickWheel's code — the app and the desktop packaging — was generated with Claude (Anthropic's AI). There's no support guarantee.

## Forking

This project isn't set up for open contributions; pull requests likely won't be merged. It's MIT licensed, so feel free to fork it and do whatever you like with your own copy.

## License

[MIT](LICENSE) — do basically whatever you'd like with it.
