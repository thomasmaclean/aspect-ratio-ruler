var toggle = [];

chrome.browserAction.setIcon({path: 'off.png'});

function toggleRuler(tab) {
  toggle[tab.id] = typeof toggle[tab.id] === 'undefined' ? true : !toggle[tab.id];
  if(toggle[tab.id]){
    chrome.browserAction.setIcon({path: 'on.png', tabId:tab.id});
	  //chrome.browserAction.setBadgeText({text: 'ready'});
    //chrome.browserAction.setBadgeBackgroundColor({color:[0,0,0,128]});
    chrome.tabs.executeScript({file:"ruler.js"});
    chrome.tabs.insertCSS({file:"ruler.css"});
  }
  else{
    chrome.browserAction.setIcon({path: 'off.png', tabId:tab.id});
    //chrome.browserAction.setBadgeText({text: ''});
    chrome.tabs.insertCSS({code:""});
    chrome.tabs.executeScript({code:"(c = document.getElementById('ar-select-board')) ? document.body.removeChild(c) : null;"});
  }
}
chrome.browserAction.onClicked.addListener(toggleRuler);
