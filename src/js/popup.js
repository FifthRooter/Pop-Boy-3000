import { getCurrentTab, saveToBlocklist } from "./helpers/runtimeApi";

setTimeout(() => {
  let checkbox = document.getElementById("blockbox");

  checkbox.addEventListener("change", (e) => {
    getCurrentTab((link) => {
      saveToBlocklist({
        link,
        isBlocklisted: e.target.checked,
      });
    });
  });
}, 300);

// Add a way to listen for when a tab is changed, so that there's a trigger to check the current tab's blocklist status and update the toggle accordingly
