import convertUnit from "./convertUnit";

export default function getConvertedUnit(text, callback) {
  let unitText = "";
  let numberString = "";
  let unitObject = {};
  let conversionRate = 0.0;
  let pattern = /^[0-9]+$/;
  let doNotConvert = true;

  text = text.trim();

  for (let i = 0; i < text.length; i++) {
    if (!pattern.test(text[0])) {
      doNotConvert = true;
    } else if (pattern.test(text[i])) {
      numberString = numberString.concat("", text[i]);
      doNotConvert = false;
    }

    if (doNotConvert) {
      unitObject = {};
    } else {
      unitText = text.slice(numberString.length, text.length).trim();
      unitObject = {
        number: numberString,
        unit: unitText,
        conversionRate,
      };
    }
  }
  unitObject = convertUnit(unitObject, (res) => {
    callback(res);
  });
}
