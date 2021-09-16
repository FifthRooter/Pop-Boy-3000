const extMainContainer = document.createElement('DIV')
const extName = document.createElement('DIV')
const extInput = document.createElement('INPUT')
const extSearchButton = document.createElement('DIV')
const extCopyButton = document.createElement('DIV')
const extUnitConv = document.createElement('DIV')


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



function convertUnit(data) {
    let convertedUnit = {}
    let num

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
        default: convertedUnit = false;
    }
    // console.log(JSON.stringify(convertedUnit));
    return convertedUnit
}




function getConvertedUnit(text) {
    let unitText = ''
    let numberString = ''
    let unitObject = {}
    // let pattern = /^\d+$/;
    let pattern = /^[0-9]+$/;

    text = text.trim()
    
    for (let i=0; i<text.length; i++) {
        if (!pattern.test(text[0])) {
            return false
        } else if (pattern.test(text[i])) {
            numberString = numberString.concat('', text[i])
        }

        unitText = text.slice(numberString.length, text.length).trim()
        unitObject = {
            number: numberString,
            unit: unitText
        }
    }
    unitObject = convertUnit(unitObject)
    return unitObject
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
        y: e.pageY+36+'px'
    }
    extMainContainer.style.top = pos.y
    extMainContainer.style.left = pos.x

    let selection = window.getSelection().toString()
    selection = selection.trim()
    let isUnit = getConvertedUnit(selection)
    if (selection.length > 0 && !highlightIsOn) {
        chrome.storage.local.set({
            name: selection
        })
        highlightIsOn = true
        document.querySelector('body').appendChild(extMainContainer)
    } else {
        if (document.getElementById('ext-name') !== null) {
            closePopBoy()
        }
        highlightIsOn = false
    }
    
    if (isUnit != false) {
        extUnitConv.innerHTML = `${isUnit.number} ${isUnit.unit}`
        extMainContainer.appendChild(extUnitConv)
        console.log(isUnit);
    } else {
        extMainContainer.removeChild(extUnitConv)
    }
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
            console.log(highlightedText);
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
                console.log('search');
                console.log(result.message);
            })
            closePopBoy()
        }
    })
})