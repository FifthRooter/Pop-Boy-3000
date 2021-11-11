# Pop-boy 3000

Super nice and convenient browser workflow booster that makes your life slightly more convenient. Inspired by Opera browser's in-built popup that does exactly the same, I wanted to recreate that experience for other Chromium-based browsers.

Main features are:
1) Copy - copies highlighted text to clipboard.
2) Search - opens a new tab runs the highlighted text as a search query in your default search engine.
3) Converts units & currencies - converts imperial units to metric units or vice-versa, converts fiat & crypto currencies to your set desired fiat or crypto currency based on recently fetched exchange rate data. To see what website(s) the exchange rates are fetched from, check file `./src/js/helpers/updateExchangeRates.js`.
4) Converts time from different time zones (not yet implemented!) to a timezone of your choosing (in the options popup).



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

# Usage

## Pop-boy 3000
Highlight a text, and the Popboy will pop up below the cursor. The popup has an expiration of 2sec, so after 2 seconds it will disappear. I'll implement more expiry customizibility and logic in the future, but right now it's just 2sec.

### Copy
To copy a text that's been highlighted, simply click the "Copy" button on the popup, and it'll copy the text to the clipboard.
![copy-feature](https://user-images.githubusercontent.com/22204845/140304034-273f4fc4-1473-4502-92e1-d7c2b52b7a44.gif)


### Search
To search the highlighted text, click the "Search" button on the popup, and it'll open a new tab and search the query in your default search engine.
![search-feature](https://user-images.githubusercontent.com/22204845/140304298-74950172-b9c4-42be-a819-2c0ed37757ef.gif)

### Unit conversion
Unit conversion feature is still quite lacking, but has a bare minimum functionality, at least for the metric system users (it currently only converts from imperial units to metric units). Various temperature, length and weight conversions have been added already, but more need to be added for a more comprehensive conversion experience. I'll also implement a metric<->imperial conversion toggle in the Options popup at some point.

Currency conversions are only possible to EUR at the moment, and even that conversion is quite limited. Only "120USD", "120 USD" would be detected as currency and converted accordingly. "USD120" or even decimals "120.20USD" are currently not resolved :D <br/>
Conversion to other currencies will be possible at a later time by adjusting the setting in the Options popup.

How the currency conversion works right now is that every 8h it fetches the latest currency conversion rates from a website and updates the extension store containing the currency conversion data. As fiat currencies don't fluctuate that much during the span of a day, I made the fetching relatively infrequent.

Another thing in my to-do list is to implement cryptocurrency conversion, with the same mechanics as for the regular currencies, only with a more frequent fetching rate (every 1h).

![unit-conversion](https://user-images.githubusercontent.com/22204845/140305985-4368dfdc-d06b-470a-9283-8f4ea7312126.gif)


## Options popup

It's possible to create a blacklist of websites on which to disable the popup, as it sometimes can get quite annoying and intrusive, for example when using browser based IDEs. More options to follow soon.
![disable-popup](https://user-images.githubusercontent.com/22204845/140306285-ea1bbb44-5d46-495c-afd9-7da852f095a3.gif)


