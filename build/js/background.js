chrome.runtime.onInstalled.addListener((()=>{})),chrome.fontSettings.setFont({genericFamily:"sansserif",fontId:"Roboto"}),chrome.tabs.onUpdated.addListener(((e,s,t)=>{"complete"===s.status&&/^http/.test(t.url)&&chrome.scripting.insertCSS({target:{tabId:e},files:["./css/popboy.css"]}).then((()=>{chrome.scripting.executeScript({target:{tabId:e},files:["./js/popboy.bundle.js"]}).then((()=>{}))})).catch((e=>{console.log(e)}))})),chrome.runtime.onMessage.addListener(((e,s,t)=>"get_highlight"===e.message?(chrome.storage.local.get("highlight",(e=>{chrome.runtime.lastError?t({message:"fail"}):t({message:"success",payload:e.highlight})})),!0):"open_url"===e.message?(chrome.search.query({disposition:"NEW_TAB",text:e.payload}),!0):"get_fiat"===e.message?(chrome.storage.local.get("fiatCurrencies",(e=>{chrome.runtime.lastError?t({message:"fail"}):t({message:"success",payload:e.fiatCurrencies})})),!0):void 0));