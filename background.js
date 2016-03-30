var toggle = false;
function toggleRuler() {
  toggle = !toggle;
  if(toggle){
    chrome.browserAction.setBadgeText({text: 'ready'});
    chrome.browserAction.setBadgeBackgroundColor({color:[0,0,0,128]});
    chrome.tabs.executeScript({file:"ruler.js"});
    chrome.tabs.insertCSS({file:"ruler.css"});
  }
  else{
    chrome.browserAction.setBadgeText({text: ''});
    chrome.tabs.insertCSS({code:""});
    chrome.tabs.executeScript({code:"document.body.removeChild(document.getElementById('ar-select-board'));"});
  }
}
chrome.browserAction.onClicked.addListener(toggleRuler);
