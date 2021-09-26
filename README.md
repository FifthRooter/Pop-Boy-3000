# Pop-boy 3000

Super nice and convenient browser workflow booster that makes your life slightly more convenient. Inspired by Opera browser's in-built popup that does exactly the same, I wanted to recreate that experience for other Chromium-based browsers.

Main features are:
1) Copy - copies highlighted text to clipboard.
2) Search - opens a new tab runs the highlighted text as a search query in your default search engine.
3) Converts units & currencies - converts imperial units to metric units or vice-versa, converts fiat & crypto currencies to your set desired fiat or crypto currency based on recently fetched exchange rate data. To see what website(s) the exchange rates are fetched from, check file `./src/js/helpers/updateExchangeRates.js`.



## Installation
Clone the project:

`git clone https://github.com/FifthRooter/pop-boy-3000.git`

Install npm packages:

`npm install`

## Build project

`npm run build`

This will bundle the relevant files into single ones, and copy other static files/assets to the build/ directory from src/ directory.
Then in your Chromium browser, go to Extensions page, turn on Developer Mode, and click Load Unpacked. Navigate to the build/ folder of the extension and click open.

To use the extension, refresh existing tabs, or open new tabs.


## Options popup

It's possible to create a blacklist of websites on which to disable the popup, as it sometimes can get quite annoying and intrusive, for example when using browser based IDEs.