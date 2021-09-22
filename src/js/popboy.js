const extMainContainer = document.createElement('DIV')
const extName = document.createElement('DIV')
const extInput = document.createElement('INPUT')
const extSearchButton = document.createElement('DIV')
const extCopyButton = document.createElement('DIV')
const extUnitConv = document.createElement('DIV')

let prevSelection = ''
let highlightIsOn = false
extMainContainer.classList.add('ext-main')
extName.id = 'ext-name'
extSearchButton.id = 'ext-btn'
extCopyButton.id = 'ext-btn'
extUnitConv.id = 'ext-unit'

extSearchButton.innerHTML = 'Search'
extCopyButton.innerHTML = 'Copy'

extMainContainer.appendChild(extName)
extMainContainer.appendChild(extCopyButton)
extMainContainer.appendChild(extSearchButton)

async function fetchFiatExchangeRates() {
    await fetch('https://www.floatrates.com/daily/eur.json')
        .then(res => res.json())
        .then(currencies => {
             chrome.storage.local.set({
                fiatCurrencies: currencies
            })
        })
}

setTimeout(() => {
    fetchFiatExchangeRates()
}, 1000);

setTimeout(() => {
    chrome.runtime.sendMessage({
        message: 'get_fiat'
    }, res => {
        if (res.message === 'success') {
        }
    })
}, 12000);

// TODO make the currency update on daily intervals
// TODO make crypto update on hourly interval

function isCurrency(data, callback) {

    let currencyPayload = {
        isCurrency: false,
        conversionRate: 0.2,
        currency: data
    }
   
    chrome.runtime.sendMessage({
        message: 'get_fiat'
    }, res => {
        if (res.message === 'success') {
            currencyPayload.isCurrency = data in res.payload
            if (currencyPayload.isCurrency) {
                currencyPayload.conversionRate = res.payload[data].inverseRate
                callback(currencyPayload)
            } else {
                callback(currencyPayload)
            }
        }
    })
}

function convertUnit(data, callback) {
    let convertedUnit = {}
    let num


    isCurrency(data.unit, (res) => { 
        if (res.isCurrency) {
            data.unit = 'currency'
        }
        

        switch (data.unit) {
            case 'inch': {
                num = data.number * 2.54
                convertedUnit = {
                    number: num.toFixed(2),
                    unit: 'cm'
                }
                break
            }
            case 'mile': {
                num = data.number * 1.609344
                convertedUnit = {
                    number: num.toFixed(2),
                    unit: 'km'
                }
                break
            }
            case 'miles': {
                num = data.number * 1.609344
                convertedUnit = {
                    number: num.toFixed(2),
                    unit: 'km'
                }
                break
            }
            case 'F': {
                num = (data.number - 32) / 1.8
                convertedUnit = {
                    number: num.toFixed(1),
                    unit: '°C'
                }
                break
            }
            case 'oz': {
                num = data.number * 28.34952
                convertedUnit = {
                    number: num.toFixed(1),
                    unit: 'g'
                }
                break
            }
            case 'currency': {
                num = data.number * res.conversionRate
                convertedUnit = {
                    number: num.toFixed(2),
                    unit: 'eur'
                }
                break
            }
            default: {
                convertedUnit = {}
            }
        }
        callback(convertedUnit)
    })   
}




function getConvertedUnit(text, callback) {
    let unitText = ''
    let numberString = ''
    let unitObject = {}
    let conversionRate = 0.69
    let pattern = /^[0-9]+$/;
    let doNotConvert = true

    text = text.trim()
    
    for (let i=0; i<text.length; i++) {
        if (!pattern.test(text[0])) {
            doNotConvert = true
        } else if (pattern.test(text[i])) {
            numberString = numberString.concat('', text[i])
            doNotConvert = false
        }

        if (doNotConvert) {
            unitObject = {}
        } else {
            unitText = text.slice(numberString.length, text.length).trim()
            unitObject = {
                number: numberString,
                unit: unitText,
                conversionRate
            }
        }
    }
    unitObject = convertUnit(unitObject, (res) => {
        callback(res)
    })
}



function closePopBoy() {
    document.querySelector('body').removeChild(extMainContainer)
    highlightIsOn = false
}



document.onkeydown = e => {
    if (e.key && highlightIsOn) {
        closePopBoy()
    }
}



document.addEventListener('mouseup', (e) => {
    let pos = {
        x: e.pageX+'px',
        y: e.pageY+30+'px'
    }
    extMainContainer.style.top = pos.y
    extMainContainer.style.left = pos.x

    let selection = window.getSelection().toString()
    selection = selection.trim()
    if (selection.length === 0 && highlightIsOn) {
        closePopBoy()
    }
    getConvertedUnit(selection, (isUnit) => {
        if (selection.length > 0 && selection !== prevSelection) {
            chrome.storage.local.set({
                name: selection
            })
            highlightIsOn = true
            document.querySelector('body').appendChild(extMainContainer)
        } else {
            if (document.getElementById('ext-name') !== null && selection === prevSelection) {
                closePopBoy()
            }
            highlightIsOn = false
        }
        if (Object.entries(isUnit).length !== 0) {
            extUnitConv.innerHTML = `${isUnit.number} ${isUnit.unit}`
            extMainContainer.appendChild(extUnitConv)
        } else if (document.getElementById(extUnitConv.id) !== null && Object.entries(isUnit).length === 0) {
            extMainContainer.removeChild(extUnitConv)
        }

        prevSelection = selection
    })
});

/**
 * Event listener section
 */

extCopyButton.addEventListener('mousedown', () => {
    chrome.runtime.sendMessage({
        message: 'get_name'
    }, res => {
        if (res.message === 'success') {
            let highlightedText = res.payload
            navigator.clipboard.writeText(highlightedText).then(() => {})
        }
    })
})

extSearchButton.addEventListener('mousedown', () => {
    chrome.runtime.sendMessage({
        message: 'get_name'
    }, res => {
        if (res.message === 'success') {
            chrome.runtime.sendMessage({
                message: 'open_url',
                payload: res.payload
            }, result => {
            })
            closePopBoy()
        }
    })
})