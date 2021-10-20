import updateExchangeRates from "./helpers/updateExchangeRates";
import getConvertedUnit from "./helpers/getConvertedUnit";
import {
  getHighlight,
  openUrl,
  setHighlight,
  getCurrentTab,
  getBlocklist,
} from "./helpers/runtimeApi";

// Create elements
const extMainContainer = document.createElement("div");
const extName = document.createElement("div");
const extSearchButton = document.createElement("button");
const extCopyButton = document.createElement("button");
const extUnitConv = document.createElement("button");

var link = document.createElement("link");
link.setAttribute("rel", "stylesheet");
link.setAttribute("type", "text/css");
document.head.appendChild(link);

// Variables
let prevSelection = "";
let highlightIsOn = false;
let fiatUpdateFrequencyInHours = 8;
let popboyDelayTimeout;
let popboyExpirationIsOn = true;

// Element id's
extMainContainer.classList.add("ext-main");
extMainContainer.id = "ext-main";
extName.id = "ext-name";
extSearchButton.id = "btn-search";
extCopyButton.id = "btn-copy";
extUnitConv.id = "ext-unit";

// Populate button text
extSearchButton.innerHTML = "Search";
extCopyButton.innerHTML = "Copy";

// Populate main element with children
extMainContainer.appendChild(extName);
extMainContainer.appendChild(extCopyButton);
extMainContainer.appendChild(extSearchButton);

/*
Intervals for fetching fiat and crypto currency rates
to keep them up-to-date. For fiat the rates don't change much
throughout the day, so those can be fetched only a few times a day,
but crypto is more volatile, and changes by the hour, so should be
updated every hour.
*/
// Fetch fiat rate first thing after extension is booted up
setTimeout(() => {
  updateExchangeRates();
}, 1000);

// Fetch fiat exchange rates every 8h
setInterval(() => {
  updateExchangeRates();
}, 1000 * 60 * 60 * fiatUpdateFrequencyInHours);

// TODO make crypto update on hourly interval

/* 
Functions
*/

function closePopBoy() {
  if (document.getElementById("ext-main")) {
    document.querySelector("body").removeChild(extMainContainer);
    highlightIsOn = false;
  }
}

function setPopboyTimeout() {
  if (popboyExpirationIsOn) {
    popboyDelayTimeout = setTimeout(() => {
      closePopBoy();
    }, 1500);
  }
}

function handleSelection(e) {
  let isSiteBlocked = false;
  getBlocklist((res) => {
    clearTimeout(popboyDelayTimeout);
    setPopboyTimeout();

    let blocklistArray;
    blocklistArray = res;

    getCurrentTab((link) => {
      let hostname = new URL(link).hostname;
      blocklistArray.forEach((item, index) => {
        item.name === hostname &&
          (isSiteBlocked = blocklistArray[index].isBlocklisted);
      });
      let pos = {
        x: e.pageX + "px",
        y: e.pageY + 30 + "px",
      };
      extMainContainer.style.top = pos.y;
      extMainContainer.style.left = pos.x;

      let selection = window.getSelection().toString();
      selection = selection.trim();
      if (selection.length === 0 && highlightIsOn) {
        closePopBoy();
        return;
      }
      getConvertedUnit(selection, (isUnit) => {
        if (
          selection.length > 0 &&
          selection !== prevSelection &&
          !isSiteBlocked
        ) {
          setHighlight(selection);
          highlightIsOn = true;
          extSearchButton.style.borderRadius = "0px 5px 5px 0px";
          document.querySelector("body").appendChild(extMainContainer);
        } else {
          if (
            document.getElementById("ext-name") !== null &&
            selection === prevSelection
          ) {
            closePopBoy();
          }
          highlightIsOn = false;
        }
        if (Object.entries(isUnit).length !== 0) {
          extSearchButton.style.borderRadius = "0";
          extUnitConv.innerHTML = `${isUnit.number} ${isUnit.unit}`;
          extMainContainer.appendChild(extUnitConv);
        } else if (
          document.getElementById(extUnitConv.id) !== null &&
          Object.entries(isUnit).length === 0
        ) {
          extMainContainer.removeChild(extUnitConv);
        }

        prevSelection = selection;
      });
    });
  });
}

/* 
Event listeners
*/

document.addEventListener("mouseup", (e) => {
  handleSelection(e);
});

document.onkeydown = (e) => {
  if (e.key && highlightIsOn) {
    closePopBoy();
  }
};

extCopyButton.addEventListener("mousedown", () => {
  getHighlight((payload) => {
    navigator.clipboard.writeText(payload).then(() => {
      closePopBoy();
    });
  });
});

extSearchButton.addEventListener("mousedown", () => {
  getHighlight((payload) => {
    openUrl(payload);
    closePopBoy();
  });
});
