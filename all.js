function onWindowLoad() {
    chrome.tabs.executeScript(null, {
        file: "all2.js"
        }, function() {
            if (chrome.extension.lastError) {
                document.body.innerText = 'There was an error injecting script : \n' + chrome.extension.lastError.message;
            }
        });
}
window.onload = onWindowLoad;