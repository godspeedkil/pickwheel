# ✦ PickWheel

**A beautiful, endlessly customizable picker — for desktop or your browser.**

Three picker styles (spinning wheel, slot machine, movie-poster marquee), weighted odds, real sound design, per-item images and winner sounds, dozens of color palettes, and a proper offline desktop app. No account, no server, no ads — everything lives on your own machine.

<img width="1238" height="766" alt="pickwheel_1" src="https://github.com/user-attachments/assets/a04b316a-13bf-4903-a44d-43d97999a684" />

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

**Three picker styles, one shared engine**
- 🎡 **Wheel** — the classic spinning wheel, weighted slices sized to match each item's odds
- 🎰 **Slot machine** — a vertical reel with a payline, lever-style Spin button
- 🎬 **Movie posters** — a horizontal marquee reel that lands on a spotlighted "poster" card (falls back to a generated gradient card with the item's name if it has no image)
- Switch between them any time from the tabs above the stage — odds, sounds, history, and the shared winner banner all stay exactly the same; only the reveal animation changes
- Every reel is shuffled so the same item won't turn up again until the rest of the pool has had a turn, so nothing feels like it's repeating right after itself
- Optional "near miss" on the wheel and slot machine — it slows down and hovers between two items, wobbling for a beat, before snapping to the real result

**Weighted odds**
- Every item gets a weight; the actual winner is always chosen by that exact weighted-random odds, identical across all three picker styles
- Bigger weight, bigger wheel slice / more frequent slot-and-poster reel appearances — the visuals track the real probability
- Cancel a spin mid-animation by clicking Spin again

**Spin behavior**
- Adjustable spin duration (2–30s), extra rotations/speed, easing style (smooth, dramatic, or mechanical), and resting angle (with an option to randomize it every spin)
- Optional idle spin — the wheel drifts slowly when it's just sitting there, purely for looks, never produces a result
- Configurable label length and auto-scaling text (with an overflow option) so more of your item names actually show, independently tunable for the wheel and the slot machine

**Items**
- Add items one at a time, or paste a batch list (`Name, weight` per line, weight optional)
- Batch tab can also append, replace the whole wheel, or match existing items by name to update just their weights — without touching their image or winner sound
- Shuffle order, per-item custom colors, an optional image per item, and an optional custom winner sound per item
- No hard limits on item count or name length

**Colors**
- 24 built-in palettes across six themes: Vibrant, Pastel, Seasonal, Holiday, Elegant, and Nature
- A "Trending 2026" theme and a "Timeless" theme (Flat UI Colors, Material Design, Solarized, Monokai, Crayola's original 1903 box, Bauhaus, Memphis Milano, iOS system colors, and 25 years of Pantone Colors of the Year)
- Build and save your own palettes

**Sound**
- 60+ generated sound effects across four categories (spin whir, tick, win fanfare, spin start) — fully synthesized, no audio files required
- Independent volume control for each sound category, so you can balance the mix yourself
- The spin-start sound plays once when you press Spin — not when you stop a spin early
- Or upload your own clips (up to 25 per category, ~3.5MB each) — one plays at random each spin, MP3/WAV/OGG and more
- Custom clips favor whichever hasn't played recently, so a category with several clips doesn't repeat the same one back-to-back
- Optional ducking on win (lowers other sounds when the win fanfare plays) and automatic loudness normalization for uploaded clips, with an adjustable target level

**The winner popup**
- Optional image per item, shown when it wins — five layout options (left/right/top/bottom/background), adjustable size and opacity, crop/fit/stretch modes
- Stays open until you dismiss it — never disappears on its own mid-glance

**Everything else**
- Save named wheel configurations and reload them instantly — each saved wheel keeps its own items, settings, and sound setup fully isolated from the others
- Full spin history with a frequency tally
- Six title fonts and an adjustable size for the wheel name
- Export/import your entire setup as a single backup file — settings, items (including per-item images and winner sounds), saved wheels, custom palettes, and sound preferences (spin history isn't included)

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
