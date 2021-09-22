export default async function updateExchangeRates() {
  await fetch("https://www.floatrates.com/daily/eur.json")
    .then((res) => res.json())
    .then((currencies) => {
      chrome.storage.local.set({
        fiatCurrencies: currencies,
      });
    });
}
