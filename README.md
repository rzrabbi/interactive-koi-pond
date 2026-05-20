# Interactive Koi Pond 🐟

An interactive, deeply relaxing Koi Pond live wallpaper for [Wallpaper Engine](https://www.wallpaperengine.io/en) and [Lively Wallpaper](https://www.rocksdanister.com/lively/). Move your cursor to create ripples, watch the fish scatter, or click to feed them!

[![Workshop Subscription](https://img.shields.io/steam/subscriptions/3692215641?style=flat&logo=steam&label=Workshop%20Subscription)](https://steamcommunity.com/sharedfiles/filedetails/?id=3692215641)
[![GitHub Downloads](https://img.shields.io/github/downloads/rzrabbi/interactive-koi-pond/total?style=flat&logo=github&label=Downloads)](https://github.com/rzrabbi/interactive-koi-pond/releases)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Try%20it%20Now-00adb5?style=flat&logo=html5&logoColor=white)](https://rzrabbi.github.io/interactive-koi-pond/demo/)

## 🌟 Features

- **Interactive Environment:** Move your cursor to create dynamic ripples.
- **Feed the Koi:** Click to drop food for the fish to seek out.
- **Shy Fish:** Fish naturally scatter and avoid your cursor.
- **Procedural Animation:** Realistic segment-based fish movement.
- **Aesthetic Caustics:** Procedural light patterns synced to the water and fish.
- **Highly Customizable:** Adjust Wallpaper Engine properties:
  - Koi count, speed, and size
  - Water color hue
  - Fish color themes (Traditional, Neon, Monochrome)
  - Toggleable caustics, feeding, and shy fish behavior
  - Ripple strength

## 📦 Installation

Choose your preferred wallpaper platform below.

---

# 🖥️ Wallpaper Engine

## Option 1: Steam Workshop (Recommended)

The easiest way to install the wallpaper through Steam Workshop.

1. Go to the [Steam Workshop Page](https://steamcommunity.com/sharedfiles/filedetails/?id=3692215641)
2. Click the green **Subscribe** button.
3. Open Wallpaper Engine.
4. The wallpaper will automatically download and appear in your library.

## Option 2: Using the Release Package

Use this option if you want to install manually using a pre-packaged release ZIP file.

1. Download the latest `.zip` file from the [GitHub Releases Page](https://github.com/rzrabbi/interactive-koi-pond/releases).
2. Extract the downloaded ZIP file.
3. Open Wallpaper Engine.
4. Click **Open Wallpaper** in the bottom-left corner.
5. Select **Create new wallpaper (animations and sharing)**.
6. Choose **Create Wallpaper**.
7. Navigate to the extracted folder.
8. Select the `index.html` file.
9. Name your project 'Koi Pond' (or any name of your choice) and click **OK**.
10. Go to **File > Apply Wallpaper**.
11. Customize the wallpaper using the properties panel according to your preference.

## Option 3: Install from Source

Use this method if you want to modify or develop the wallpaper locally.

1. Clone the repository:

```bash
git clone https://github.com/rzrabbi/interactive-koi-pond.git
```

2. Open Wallpaper Engine.
3. Click **Open Wallpaper** in the bottom-left corner.
4. Select **Create new wallpaper (animations and sharing)**.
5. Choose **Create Wallpaper**.
6. Navigate to the cloned repository.
7. Select the `index.html` file.
8. Name your project 'Koi Pond' (or any name of your choice) and click **OK**.
9. Go to **File > Apply Wallpaper**.
10. Customize the wallpaper using the properties panel according to your preference.

---

# 🌊 Lively Wallpaper

A free alternative to Wallpaper Engine. If you don't have it installed, you can [download Lively Wallpaper here](https://www.rocksdanister.com/lively/) or fetch the latest release directly from [GitHub Releases](https://github.com/rocksdanister/lively/releases).

## Option 4: Install Using Release Package (Recommended)

1. Go to the [GitHub Releases Page](https://github.com/rzrabbi/interactive-koi-pond/releases)
2. Download the latest `.zip` release package.
3. Install and open Lively Wallpaper.
4. Click the **Add Wallpaper (+)** button.
5. Drag and drop the downloaded `.zip` file into the Lively window.
6. Follow the on-screen setup instructions.

## Option 5: Developer / Git Method

Use this method for development or manual installation.

1. Clone the repository:

```bash
git clone https://github.com/rzrabbi/interactive-koi-pond.git
```

2. Open Lively Wallpaper.
3. Click the **Add Wallpaper (+)** button.
4. Under **Select File**, choose **Choose a File**.
5. Navigate to the cloned repository.
6. Select the `index.html` file.
7. Apply the wallpaper and enjoy.


## 🛠️ Architecture

A unified bridge architecture is utilized to support Wallpaper Engine, Lively Wallpaper, and the Web Demo through a single core engine.

- **Core Engine:** `script.js` natively listens to the Wallpaper Engine API format (`window.wallpaperPropertyListener.applyUserProperties`).
- **Lively Wallpaper Proxy:** The `livelyPropertyListener` function intercepts data, formats it into a Wallpaper Engine object, and pipes it into the core listener.
- **Web Demo UI:** Standard HTML inputs (`/demo/demo.js`) are packaged into Wallpaper Engine objects and piped directly into the core listener.

Updates made to `script.js` are automatically applied across all platforms.

---

## 📜 License

This project is licensed under the MIT License.
