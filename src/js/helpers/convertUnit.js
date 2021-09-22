import { getFiat } from "./runtimeApi";

function getCurrency(data, callback) {
  let currencyPayload = {
    isCurrency: false,
    conversionRate: 0,
    currency: data,
  };

  getFiat((payload) => {
    currencyPayload.isCurrency = data in payload;
    if (currencyPayload.isCurrency) {
      currencyPayload.conversionRate = payload[data].inverseRate;
      callback(currencyPayload);
    } else {
      callback(currencyPayload);
    }
  });
}

export default function convertUnit(data, callback) {
  let convertedUnit = {};
  let num;

  getCurrency(data.unit, (res) => {
    if (res.isCurrency) {
      data.unit = "currency";
    }

    switch (data.unit) {
      case "inch": {
        num = data.number * 2.54;
        convertedUnit = {
          number: num.toFixed(2),
          unit: "cm",
        };
        break;
      }
      case "mile": {
        num = data.number * 1.609344;
        convertedUnit = {
          number: num.toFixed(2),
          unit: "km",
        };
        break;
      }
      case "miles": {
        num = data.number * 1.609344;
        convertedUnit = {
          number: num.toFixed(2),
          unit: "km",
        };
        break;
      }
      case "F": {
        num = (data.number - 32) / 1.8;
        convertedUnit = {
          number: num.toFixed(1),
          unit: "°C",
        };
        break;
      }
      case "oz": {
        num = data.number * 28.34952;
        convertedUnit = {
          number: num.toFixed(1),
          unit: "g",
        };
        break;
      }
      case "currency": {
        num = data.number * res.conversionRate;
        convertedUnit = {
          number: num.toFixed(2),
          unit: "eur",
        };
        break;
      }
      default: {
        convertedUnit = {};
      }
    }
    callback(convertedUnit);
  });
}
