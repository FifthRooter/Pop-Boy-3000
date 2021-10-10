/////////////////
//     Save    //
/////////////////

export function setHighlight(selection) {
  chrome.storage.local.set({
    highlight: selection,
  });
}

export function saveToBlocklist(link) {
  getBlocklist((res) => {
    let blocklistArray;
    blocklistArray = res;
    let pathname = new URL(link).hostname;
    console.log(pathname);
    chrome.storage.local.set({
      blocklist: blocklistArray,
    });
  });
}

/////////////////
//     Get     //
/////////////////

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

export function getCurrentTab(callback) {
  chrome.runtime.sendMessage(
    {
      message: "get_current_tab",
    },
    (res) => {
      if (res.message === "success") {
        callback(res.payload);
      } else {
        console.log("error!!!");
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

export function getBlocklist(callback) {
  chrome.runtime.sendMessage(
    {
      message: "get_blocklist",
    },
    (res) => {
      if (res.message === "success") {
        callback(res.payload);
      }
    }
  );
}

/////////////////
//    Action   //
/////////////////

export function openUrl(payload) {
  chrome.runtime.sendMessage(
    {
      message: "open_url",
      payload: payload,
    },
    (result) => {}
  );
}
