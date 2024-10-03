document.getElementById("summarize").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const videoUrl = tabs[0].url; // Get the current video URL
    chrome.runtime.sendMessage(
      { action: "summarize", videoUrl },
      (response) => {
        document.getElementById("summary").innerText = response.summary;
      }
    );
  });
});
