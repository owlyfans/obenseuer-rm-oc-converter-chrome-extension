# RM ↔ OC Currency Converter - Chrome Extension

A simple and elegant Chrome extension for converting between RM and OC currencies.

## Features

- ✨ Clean, minimal dark theme interface
- 🔄 Bidirectional conversion (type in either field)
- ⚙️ Customizable conversion rates
- 💾 Persistent rate storage
- 🎯 Compact popup design optimized for quick conversions

## Installation

### Method 1: Download from Chrome Web Store
1. Open Chrome or Chromium web browther and navigate to `https://chromewebstore.google.com/detail/rm-%E2%86%94-oc-currency-converte/odbgdmpgiakfnkmkngefbppjoelojcfb`
2. Click "Add to Chrome" (Chrome may be replaced with the name of your chromium web browther)

### Method 2: Load Unpacked Extension (For Development/Testing)

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top right corner
3. Click "Load unpacked"
4. Select the folder containing all the extension files:
   - `manifest.json`
   - `popup.html`
   - `popup.js`
   - `styles.css`
   - `icon16.png`
   - `icon48.png`
   - `icon128.png`

5. The extension icon should appear in your Chrome toolbar
6. Click the icon to open the converter

### Method 2: Package as .crx (For Distribution)

1. Navigate to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Pack extension"
4. Select the extension folder
5. Share the generated `.crx` file

## Usage

1. **Enter Amount**: Type a number in either the RM or OC field
2. **Instant Conversion**: The result appears automatically in the other field
3. **Edit Rates**: Click "Edit Rates" to customize conversion rates

## Default Rates

- 1 RM = 9.80 OC
- 1 OC = 0.10 RM

These rates can be customized in the extension settings.

## Technical Details

- **Manifest Version**: 3
- **Permissions**: `storage` (for saving custom rates)
- **Storage**: Uses `chrome.storage.local` API
- **No tracking**: No history or analytics

## File Structure

```
currency-converter-extension/
├── manifest.json       # Extension configuration
├── popup.html         # Main UI
├── popup.js           # Conversion logic
├── styles.css         # Dark theme styling
├── icon16.png         # Toolbar icon (small)
├── icon48.png         # Extension manager icon
├── icon128.png        # Chrome Web Store icon
└── README.md          # This file
```

## Customization

### Changing Colors

Edit `styles.css`:
- RM currency color: `.currency-label[data-currency="RM"]` (default: #4AFD27)
- OC currency color: `.currency-label[data-currency="OC"]` (default: #E65A22)

### Changing Default Rates

Edit `popup.js`, modify the `RATES` object:
```javascript
let RATES = {
    RM: 9.8,      // 1 RM to OC
    OC: 0.10  // 1 OC to RM
};
```
