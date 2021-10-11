/////////////////
//     Save    //
/////////////////

export function setHighlight(selection) {
  chrome.storage.local.set({
    highlight: selection,
  });
}

export function saveToBlocklist(payload) {
  getBlocklist((res) => {
    let blocklistArray;

    blocklistArray = res;
    let hostname = new URL(payload.link).hostname;

    if (blocklistArray.filter((item) => item.name === hostname).length === 0) {
      blocklistArray.push({
        name: hostname,
        isBlocklisted: payload.isBlocklisted,
      });
    } else {
      let itemIndex;
      blocklistArray.forEach((item, index) => {
        item.name === hostname && (itemIndex = index);
      });
      blocklistArray[itemIndex].isBlocklisted = payload.isBlocklisted;
    }

    chrome.storage.local.set({
      blocklist: blocklistArray,
    });
    console.log(JSON.stringify(blocklistArray[0]));
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
