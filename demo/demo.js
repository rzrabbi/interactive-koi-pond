// Function to update the engine using the existing Wallpaper Engine API bridge
function updateWallpaperProperty(name, value) {
    const props = {};
    props[name] = { value: value };
    window.wallpaperPropertyListener.applyUserProperties(props);
}

// Bind Sliders
const sliders = ['fishCount', 'fishSize', 'fishSpeed', 'waterHue', 'rippleStrength'];
sliders.forEach(id => {
    const el = document.getElementById(id);
    const valDisplay = document.getElementById(`${id}-val`);
    
    el.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        valDisplay.textContent = val;
        updateWallpaperProperty(id, val);
    });
});

// Bind Dropdown
const themeSelect = document.getElementById('fishTheme');
themeSelect.addEventListener('change', (e) => {
    updateWallpaperProperty('fishTheme', parseInt(e.target.value));
});

// Bind Checkboxes
const checkboxes = ['enableCaustics', 'enableFeeding', 'shyFish'];
checkboxes.forEach(id => {
    const el = document.getElementById(id);
    el.addEventListener('change', (e) => {
        updateWallpaperProperty(id, e.target.checked);
    });
});

// Fullscreen Logic
const fullscreenBtn = document.getElementById('fullscreen-btn');
fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.warn(`Error attempting to enable fullscreen: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
});

// Update fullscreen button icon based on state
document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
        fullscreenBtn.innerHTML = '🗗'; // Exit fullscreen icon
        fullscreenBtn.title = 'Exit Fullscreen';
    } else {
        fullscreenBtn.innerHTML = '⛶'; // Enter fullscreen icon
        fullscreenBtn.title = 'Toggle Fullscreen';
    }
});

// Minimize Logic
const minimizeBtn = document.getElementById('minimize-btn');
const uiPanel = document.getElementById('ui-panel');
minimizeBtn.addEventListener('click', () => {
    uiPanel.classList.toggle('minimized');
    if (uiPanel.classList.contains('minimized')) {
        minimizeBtn.innerHTML = '+';
        minimizeBtn.title = 'Expand Panel';
    } else {
        minimizeBtn.innerHTML = '−';
        minimizeBtn.title = 'Minimize Panel';
    }
});

// Reset Logic
const resetBtn = document.getElementById('reset-btn');
resetBtn.addEventListener('click', () => {
    // Define defaults
    const defaults = {
        fishCount: 15,
        fishSize: 1,
        fishSpeed: 1.5,
        waterHue: 195,
        rippleStrength: 1,
        fishTheme: 0,
        enableCaustics: true,
        enableFeeding: true,
        shyFish: true
    };

    // Reset Sliders
    sliders.forEach(id => {
        const el = document.getElementById(id);
        el.value = defaults[id];
        document.getElementById(`${id}-val`).textContent = defaults[id];
        updateWallpaperProperty(id, defaults[id]);
    });

    // Reset Dropdown
    themeSelect.value = defaults.fishTheme;
    updateWallpaperProperty('fishTheme', defaults.fishTheme);

    // Reset Checkboxes
    checkboxes.forEach(id => {
        const el = document.getElementById(id);
        el.checked = defaults[id];
        updateWallpaperProperty(id, defaults[id]);
    });
});
