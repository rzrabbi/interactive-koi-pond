const defaultSettings = {
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

// Wallpaper Engine bridge
function updateWallpaperProperty(name, value) {
    const props = {};
    props[name] = { value: value };
    window.wallpaperPropertyListener.applyUserProperties(props);
}

// Update slider track fill
function updateSliderCSS(el) {
    const min = parseFloat(el.min) || 0;
    const max = parseFloat(el.max) || 100;
    const val = parseFloat(el.value);
    const percent = ((val - min) / (max - min)) * 100;
    el.style.setProperty('--val', `${percent}%`);
}

// Sliders initialization and listeners
const sliders = ['fishCount', 'fishSize', 'fishSpeed', 'waterHue', 'rippleStrength'];
const sliderDisplays = {};

sliders.forEach(id => {
    const el = document.getElementById(id);
    sliderDisplays[id] = document.getElementById(`${id}-val`);
    
    updateSliderCSS(el);
    updateWallpaperProperty(id, parseFloat(el.value));
    
    el.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        sliderDisplays[id].textContent = val;
        updateSliderCSS(e.target);
        updateWallpaperProperty(id, val);
    });
});

// Dropdown initialization and listener
const themeSelect = document.getElementById('fishTheme');
updateWallpaperProperty('fishTheme', parseInt(themeSelect.value));
themeSelect.addEventListener('change', (e) => {
    updateWallpaperProperty('fishTheme', parseInt(e.target.value));
});

// Checkboxes initialization and listeners
const checkboxes = ['enableCaustics', 'enableFeeding', 'shyFish'];
checkboxes.forEach(id => {
    const el = document.getElementById(id);
    updateWallpaperProperty(id, el.checked);
    el.addEventListener('change', (e) => {
        updateWallpaperProperty(id, e.target.checked);
    });
});

// Fullscreen controls
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

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT') {
        const type = e.target.type;
        if (type === 'text' || type === 'password' || type === 'email' || type === 'search' || type === 'number') {
            return;
        }
    }
    if (e.target.tagName === 'TEXTAREA') return;
    
    if (e.key.toLowerCase() === 'm') {
        document.body.classList.toggle('ui-hidden');
    }
});

// Fullscreen state handler
let promptTimeout;
document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
        document.body.classList.add('is-fullscreen');
        const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        
        if (isDesktop) {
            document.body.classList.add('ui-hidden');
        }
        
        const prompt = document.getElementById('fullscreen-prompt');
        if (prompt && isDesktop) {
            prompt.innerHTML = 'Press Esc to exit fullscreen<br><span style="font-size: 0.9rem; color: #ddd;">Press M to toggle menu</span>';
            prompt.classList.add('show');
            clearTimeout(promptTimeout);
            promptTimeout = setTimeout(() => {
                prompt.classList.remove('show');
            }, 4000);
        }

        fullscreenBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path></svg>';
        fullscreenBtn.title = 'Exit Fullscreen';
    } else {
        document.body.classList.remove('is-fullscreen');
        document.body.classList.remove('ui-hidden');
        fullscreenBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>';
        fullscreenBtn.title = 'Toggle Fullscreen';
    }
});

// Panel toggle (minimize)
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

// Prevent UI events from triggering background ripples and spawning food
const preventWallpaperInteractions = (el) => {
    ['click', 'mousemove', 'mousedown', 'mouseup', 'touchstart', 'touchmove'].forEach(type => {
        el.addEventListener(type, (e) => {
            e.stopPropagation();
            if (typeof mouse !== 'undefined') {
                mouse.active = false;
            }
        });
    });
    el.addEventListener('mouseenter', () => {
        if (typeof mouse !== 'undefined') {
            mouse.active = false;
        }
    });
    el.addEventListener('mouseleave', () => {
        if (typeof mouse !== 'undefined') {
            mouse.active = false;
        }
    });
};

if (uiPanel) preventWallpaperInteractions(uiPanel);
const actionBar = document.getElementById('action-bar');
if (actionBar) preventWallpaperInteractions(actionBar);

// Reset control values to default
const resetBtn = document.getElementById('reset-btn');
resetBtn.addEventListener('click', () => {
    resetBtn.classList.remove('spin-anim');
    void resetBtn.offsetWidth; // Trigger reflow
    resetBtn.classList.add('spin-anim');

    sliders.forEach(id => {
        const el = document.getElementById(id);
        el.value = defaultSettings[id];
        sliderDisplays[id].textContent = defaultSettings[id];
        updateSliderCSS(el);
        updateWallpaperProperty(id, defaultSettings[id]);
    });

    themeSelect.value = defaultSettings.fishTheme;
    updateWallpaperProperty('fishTheme', defaultSettings.fishTheme);

    checkboxes.forEach(id => {
        const el = document.getElementById(id);
        el.checked = defaultSettings[id];
        updateWallpaperProperty(id, defaultSettings[id]);
    });
});

// Fetch Steam Workshop stats
fetch('https://img.shields.io/steam/subscriptions/3692215641.json')
    .then(res => res.json())
    .then(data => {
        const count = data.message || '0';
        document.getElementById('steam-sub-count').textContent = count + ' Subscribers';
    })
    .catch(err => {
        console.warn('Failed to fetch Steam subscribers:', err);
    });

// Fetch GitHub downloads with 1-hour caching
const GITHUB_CACHE_KEY = 'koi_github_stats';
const GITHUB_CACHE_TIME = 60 * 60 * 1000;

function updateGithubDOM(count, url) {
    document.getElementById('github-dl-count').textContent = count + ' Downloads';
    if (url) {
        const dlBtn = document.querySelector('.download-btn');
        if (dlBtn) dlBtn.href = url;
    }
}

try {
    const cached = JSON.parse(localStorage.getItem(GITHUB_CACHE_KEY));
    if (cached && Date.now() - cached.timestamp < GITHUB_CACHE_TIME) {
        updateGithubDOM(cached.count, cached.url);
    } else {
        fetchGithubData();
    }
} catch (e) {
    fetchGithubData();
}

function fetchGithubData() {
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
                            if (!latestDownloadUrl && asset.name.endsWith('.zip')) {
                                latestDownloadUrl = asset.browser_download_url;
                            }
                        });
                    }
                });
            }
            
            updateGithubDOM(count, latestDownloadUrl);
            
            try {
                localStorage.setItem(GITHUB_CACHE_KEY, JSON.stringify({
                    timestamp: Date.now(),
                    count: count,
                    url: latestDownloadUrl
                }));
            } catch(e) {}
        })
        .catch(err => {
            console.warn('Failed to fetch GitHub data:', err);
        });
}
