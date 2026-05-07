# Web Scraper Chrome Extension

A minimal Chrome extension that scrapes the visible text content of the active tab and saves it as a `.doc` file.

## Features

- **One-Click Scraping** – Click the extension icon and press "Scrape" to extract all visible text from the current webpage.
- **Automatic Download** – The scraped content is immediately downloaded as a Microsoft Word document (`scraped-content.doc`).
- **Minimal Permissions** – Uses only `activeTab` and `scripting`, respecting user privacy.

## File Structure

| File            | Description |
|-----------------|-------------|
| `manifest.json` | Extension configuration (Manifest V3). |
| `popup.html`    | Simple popup UI with a button and output area. |
| `popup.js`      | Popup logic: triggers content script, captures result, and initiates download. |

## How to Install (Developer Mode)

1. **Clone or download** this repository to your computer.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode** (toggle in the top right).
4. Click **Load unpacked** and select the folder containing the extension files.
5. The extension icon will appear in your browser toolbar.

## Usage

1. Navigate to any webpage.
2. Click the Web Scraper extension icon.
3. Press the **Scrape** button.
4. A file named `scraped-content.doc` will be downloaded automatically.
5. The scraped text can be viewed inside the popup’s `<pre>` area (currently not displayed – see notes below).

## How It Works

- The popup script queries the active tab and injects a function (`scrapeContent`) that returns `document.body.innerText`.
- The result is passed back to the popup, where it is packaged as a Blob with MIME type `application/msword`.
- A temporary URL is created and a hidden anchor element triggers the download.

## Limitations & Known Issues

- Only extracts the inner text of the page – no images, formatting, or structured data.
- The Word document is plain text inside a `.doc` container; it does not use actual Word formatting.
- The popup’s `<pre id="output">` element is not updated with the scraped content (only download is performed).
- Large pages may produce very long text; browser memory limits could apply.
- No option to select specific parts of the page or exclude elements.

## Future Enhancements

- Display scraped content in the popup before downloading.
- Add options to save as `.txt`, `.html`, or formatted `.docx`.
- Implement selective scraping (e.g., scrape only a specific CSS selector).
- Introduce error handling for cases where injection fails.
- Add a progress indicator for lengthy pages.
