chrome.runtime.onInstalled.addListener(() => {
  // Do something first time extension is installed
  // TODO Add multi-language/alphabet support
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && /^http/.test(tab.url)) {
    chrome.scripting
      .insertCSS({
        target: { tabId },
        files: ["./css/popboy.css"],
      })
      .then(() => {
        chrome.scripting
          .executeScript({
            target: { tabId },
            files: ["./js/popboy.bundle.js"],
          })
          .then(() => {});
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "get_highlight") {
    chrome.storage.local.get("highlight", (data) => {
      if (chrome.runtime.lastError) {
        sendResponse({
          message: "fail",
        });
        return;
      }
      sendResponse({
        message: "success",
        payload: data.highlight,
      });
    });

    return true;
    // need to return true to keep the communication line open for any asynchronous processes
    // https://www.youtube.com/watch?v=5E94S1J2vBI @ 47:30
  } else if (request.message === "open_url") {
    chrome.search.query({
      disposition: "NEW_TAB",
      text: request.payload,
    });
    return true;
  } else if (request.message === "get_fiat") {
    chrome.storage.local.get("fiatCurrencies", (data) => {
      if (chrome.runtime.lastError) {
        sendResponse({
          message: "fail",
        });
        return;
      }
      sendResponse({
        message: "success",
        payload: data.fiatCurrencies,
      });
    });

    return true;
  }
});
