const extMainContainer = document.createElement('DIV')
const extName = document.createElement('DIV')
const extInput = document.createElement('INPUT')
const extSearchButton = document.createElement('DIV')
const extCopyButton = document.createElement('DIV')

let highlightIsOn = false

extMainContainer.classList.add('ext-main')
extName.id = 'ext-name'
//extInput.id = 'ext-input'
extSearchButton.id = 'ext-btn'
extCopyButton.id = 'ext-btn'

//extName.innerHTML = 'Hello NAME'
extSearchButton.innerHTML = 'Search'
extCopyButton.innerHTML = 'Copy'

extMainContainer.appendChild(extName)
//extMainContainer.appendChild(extInput)
extMainContainer.appendChild(extCopyButton)
extMainContainer.appendChild(extSearchButton)

document.addEventListener('mouseup', (e) => {
    let pos = {
        x: e.pageX+'px',
        y: e.pageY+36+'px'
    }
    extMainContainer.style.top = pos.y
    extMainContainer.style.left = pos.x

    let selection = window.getSelection().toString()
    selection = selection.trim()
    if (selection.length > 0 && !highlightIsOn) {
        chrome.storage.local.set({
            name: selection
        })
        highlightIsOn = true
        document.querySelector('body').appendChild(extMainContainer)
    } else {
        if (document.getElementById('ext-name') !== null) {
            document.querySelector('body').removeChild(extMainContainer)
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
        }
    })
})

// chrome.runtime.sendMessage({
//     message: 'get_name'
// }, res => {
//     if (res.message === 'success') {
//         extName.innerHTML = `{res.payload}`
//     }
// })

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.message === 'change_name') {
//         extName.innerHTML = `Hello ${request.payload}`
//     }
//     sendResponse(() => {
//         return
//     })

// })

// extButton.addEventListener('click', () => {
//     chrome.runtime.sendMessage({
//         message: 'change_name',
//         payload: extInput.value
//     }, res => {
//         if (res.message === 'success') {
//             extName.innerHTML = `Hello ${extInput.value}`
//         }
//     })
// })



// TODO
// create onmouseup event, extract cursor position
// set showPop to true
// if true, show the PopBoy html element
// also check if selection isn't empty and if it has units