import {
  getBlocklist,
  getCurrentTab,
  saveToBlocklist,
} from "./helpers/runtimeApi";

let checkbox = document.getElementById("blockbox");

checkbox.addEventListener("change", (e) => {
  getCurrentTab((link) => {
    saveToBlocklist({
      link,
      isBlocklisted: e.target.checked,
    });
  });
});

getBlocklist((res) => {
  let blocklistArray;
  blocklistArray = res;

  getCurrentTab((link) => {
    let hostname = new URL(link).hostname;
    blocklistArray.forEach((item, index) => {
      item.name === hostname &&
        (checkbox.checked = blocklistArray[index].isBlocklisted);
    });
  });
});
