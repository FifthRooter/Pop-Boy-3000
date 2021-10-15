import {
  getBlocklist,
  getCurrentTab,
  saveToBlocklist,
} from "./helpers/runtimeApi";

setTimeout(() => {
  let checkbox = document.getElementById("blockbox");

  getBlocklist((res) => {
    let blocklistArray;
    blocklistArray = res;

    getCurrentTab((link) => {
      let hostname = new URL(link).hostname;
      let itemIndex;
      console.log(hostname);
      blocklistArray.forEach((item, index) => {
        item.name === hostname && (itemIndex = index);
      });
      console.log(blocklistArray[itemIndex]);
      checkbox.checked = !blocklistArray[itemIndex].isBlocklisted;
    });
  });

  checkbox.addEventListener("change", (e) => {
    getCurrentTab((link) => {
      saveToBlocklist({
        link,
        isBlocklisted: e.target.checked,
      });
    });
  });
}, 300);
