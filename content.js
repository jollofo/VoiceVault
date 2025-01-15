// Content script to extract page content
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "extractContent") {
      // Extract main content using various methods
      let content = "";
  
      // Try extracting from common content containers
      const contentSelectors = [
        "article",
        "main",
        "#main-content",
        ".content",
        "body",
      ];
  
      for (let selector of contentSelectors) {
        const element = document.querySelector(selector);
        if (element) {
          content = element.innerText;
          break;
        }
      }
  
      // If no content found, use body text
      if (!content) {
        content = document.body.innerText;
      }
  
      // Remove extra whitespace and limit length
      content = content.replace(/\s+/g, " ").trim();
  
      sendResponse({ content: content });
      return true;
    }
  });