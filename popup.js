document.getElementById('scrape').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: scrapeContent,
    }, (results) => {
      const textContent = results[0].result;
      saveAsDocFile(textContent);
    });
  });
  
  function scrapeContent() {
    return document.body.innerText;
  }
  
  function saveAsDocFile(content) {
    const blob = new Blob([content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'scraped-content.doc';
    a.click();
    URL.revokeObjectURL(url);
  }
  