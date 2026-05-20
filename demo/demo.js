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
        fullscreenBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path></svg>'; // Exit fullscreen icon
        fullscreenBtn.title = 'Exit Fullscreen';
    } else {
        fullscreenBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>'; // Enter fullscreen icon
        fullscreenBtn.title = 'Toggle Fullscreen';
    }
});

// Minimize Logic
const minimizeBtn = document.getElementById('minimize-btn');
const uiPanel = document.getElementById('ui-panel');
minimizeBtn.addEventListener('click', () => {
    uiPanel.classList.toggle('minimized');
    if (uiPanel.classList.contains('minimized')) {
        minimizeBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';
        minimizeBtn.title = 'Expand Panel';
    } else {
        minimizeBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>';
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

// Fetch Steam Workshop Subscribers
fetch('https://img.shields.io/steam/subscriptions/3692215641.json')
    .then(res => res.json())
    .then(data => {
        const count = data.message || '0';
        document.getElementById('steam-sub-count').textContent = count + ' Subscribers';
    })
    .catch(err => {
        console.warn('Failed to fetch Steam subscribers:', err);
    });

// Fetch GitHub Release Data (Downloads and Latest ZIP URL)
fetch('https://api.github.com/repos/rzrabbi/interactive-koi-pond/releases')
    .then(res => res.json())
    .then(data => {
        let count = 0;
        let latestDownloadUrl = null;

        if (Array.isArray(data)) {
            data.forEach(release => {
                if (release.assets) {
                    release.assets.forEach(asset => {
                        count += asset.download_count;
                        
                        // Grab the download URL from the newest release that has a zip file
                        if (!latestDownloadUrl && asset.name.endsWith('.zip')) {
                            latestDownloadUrl = asset.browser_download_url;
                        }
                    });
                }
            });
        }
        
        document.getElementById('github-dl-count').textContent = count + ' Downloads';
        
        if (latestDownloadUrl) {
            const dlBtn = document.querySelector('.download-btn');
            if (dlBtn) dlBtn.href = latestDownloadUrl;
        }
    })
    .catch(err => {
        console.warn('Failed to fetch GitHub data:', err);
    });
