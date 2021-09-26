import updateExchangeRates from "./helpers/updateExchangeRates";
import getConvertedUnit from "./helpers/getConvertedUnit";
import { getHighlight, openUrl, setHighlight } from "./helpers/runtimeApi";

// Create elements
const extMainContainer = document.createElement("DIV");
const extName = document.createElement("DIV");
const extInput = document.createElement("INPUT");
const extSearchButton = document.createElement("DIV");
const extCopyButton = document.createElement("DIV");
const extUnitConv = document.createElement("DIV");

var link = document.createElement("link");
link.setAttribute("rel", "stylesheet");
link.setAttribute("type", "text/css");
link.setAttribute(
  "href",
  "https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap"
);
document.head.appendChild(link);

// Variables
let prevSelection = "";
let highlightIsOn = false;
let fiatUpdateFrequencyInHours = 8;

// Element id's
extMainContainer.classList.add("ext-main");
extName.id = "ext-name";
extSearchButton.id = "ext-btn";
extCopyButton.id = "ext-btn";
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
  document.querySelector("body").removeChild(extMainContainer);
  highlightIsOn = false;
}

function handleSelection(e) {
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
  }
  getConvertedUnit(selection, (isUnit) => {
    if (selection.length > 0 && selection !== prevSelection) {
      setHighlight(selection);
      highlightIsOn = true;
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
    navigator.clipboard.writeText(payload).then(() => {});
  });
});

extSearchButton.addEventListener("mousedown", () => {
  getHighlight((payload) => {
    openUrl(payload);
    closePopBoy();
  });
});
