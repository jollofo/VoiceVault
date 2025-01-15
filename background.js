chrome.runtime.onInstalled.addListener(() => {
    if(chrome.runtime.lastError) {
      console.warn("Whoops.. " + chrome.runtime.lastError.message);
    } else {
      console.log('WebPage Summarizer Extension Installed');
    }
  });