export function getFiat(callback) {
  chrome.runtime.sendMessage(
    {
      message: "get_fiat",
    },
    (res) => {
      if (res.message === "success") {
        callback(res.payload);
      }
    }
  );
}

export function getHighlight(callback) {
  chrome.runtime.sendMessage(
    {
      message: "get_highlight",
    },
    (res) => {
      if (res.message === "success") {
        callback(res.payload);
      }
    }
  );
}

export function setHighlight(selection) {
  chrome.storage.local.set({
    highlight: selection,
  });
}

export function openUrl(payload) {
  chrome.runtime.sendMessage(
    {
      message: "open_url",
      payload: payload,
    },
    (result) => {}
  );
}

export function getCurrentTab() {
  chrome.runtime.sendMessage(
    {
      message: "get_current_tab",
    },
    (result) => {
      console.log(JSON.stringify(result));
    }
  );
}
