// import convertUnit from "./helpers/convertUnit"

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

extSearchButton.innerHTML = 'Search'
extCopyButton.innerHTML = 'Copy'

extMainContainer.appendChild(extName)
extMainContainer.appendChild(extCopyButton)
extMainContainer.appendChild(extSearchButton)

function convertUnit(text) {
    let unitText = ''
    let numberString = ''
    let unitObject = {}
    // let pattern = /^\d+$/;
    let pattern = /^[0-9]+$/;

    text = text.trim()
    //console.log('Text: '+text);
    
    for (let i=0; i<text.length; i++) {
        if (pattern.test(text[i])) {
            numberString = numberString.concat('', text[i])
            console.log(numberString);
        }

        unitText = text.slice(numberString.length, text.length-1)

        unitObject = {
            number: numberString,
            unit: unitText
        }
        console.log(JSON.stringify(unitObject));
    }
    return unitObject
}

function closePopBoy() {
    document.querySelector('body').removeChild(extMainContainer)
    highlightIsOn = false
}


document.onkeydown = e => {
    if (e.key === 'Escape') {
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
    //let isUnit = convertUnit(selection)
    //console.log(isUnit);
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
    
});


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