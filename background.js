chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({
        name: 'Tom'
    })
})


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && /^http/.test(tab.url)){
        chrome.scripting.insertCSS({
            target: {tabId},
            files: ['./styles/foreground-styles.css']
        })
        .then(() => {
            chrome.scripting.executeScript({
                target: {tabId},
                files: ['./popboy.js']
            })
            .then(() => {
                 console.log('injected foreground script');
                //  chrome.tabs.sendMessage(tabId, {
                //      message: 'change_name',
                //      payload: 'John'
                //  })
            })
        })
        .catch((err) => {console.log(err)})
    }
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'get_name') {
        chrome.storage.local.get('name', data => {
            if (chrome.runtime.lastError) {
                sendResponse({
                    message: 'fail'
                })
                return
            }
            console.log(data.name);
            sendResponse({
                message: 'success',
                payload: data.name
            })
        })

        return true
        // need to return true to keep the communication line open for any asynchronous processes
        // https://www.youtube.com/watch?v=5E94S1J2vBI @ 47:30
    } else if (request.message === 'change_name') {
        chrome.storage.local.set({
            name: request.payload
        }, () => {
            if (chrome.runtime.lastError) {
                sendResponse({message: 'fail'})
                return
            }
            sendResponse({message: 'success'})
        })

        return true
    } else if (request.message === 'open_url') {
        console.log('open url');
        // chrome.runtime.sendMessage({
        //     message: 'get_name'
        // }, res => {
        //     if (res.message === 'success') {
        //         sendResponse({
        //             message: 'success'
        //         })
                
        //     }
        // })
        // chrome.tabs.create({
        //     "url": 'https://www.duckduckgo.com/?q='+request.payload
        //   });
        chrome.search.query({disposition: "NEW_TAB", text: request.payload})

        return true
    }
})

