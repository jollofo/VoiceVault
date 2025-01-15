document.addEventListener("DOMContentLoaded", function () {
    const summarizeBtn = document.getElementById("summarize-btn");
    const speechBtn = document.getElementById("speech-btn");
  
    const summaryDiv = document.getElementById("summary");
  
    const summaryLoadingDiv = document.getElementById("loading-summary");
    const speechLoadingDiv = document.getElementById("loading-speech");
  
    let text = "";
  
    // Summarize button click handler
    summarizeBtn.addEventListener("click", function () {
      // Send message to content script to extract page content
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: "extractContent" },
          function (response) {
            if (response && response.content) {
              // Show loading
              summaryLoadingDiv.style.display = "block";
              summaryDiv.textContent = "";
  
              // Call Ollama to summarize
              fetchSummary(response.content);
            }
          }
        );
      });
    });
  
    // Function to fetch summary from OpenAI
    function fetchSummary(content) {
      // Truncate content if it's too long (OpenAI has token limits)
      const MAX_TOKENS = 2048; // Token limit is 2048
      const truncatedInput = content.substring(0, MAX_TOKENS);
      console.log(truncatedInput);
        
      fetch("Ollama/OpenAI API", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "llama3.2",
          prompt: `Please summarize the following content: ${truncatedInput}. Focus on main points and don't use asterisks.`,
          stream: false,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response not ok");
          }
          return res.json();
        })
        .then((data) => {
          summaryLoadingDiv.style.display = "none";
          summaryDiv.textContent = data.response || "Failed to summarize.";
          text = data.response;
        })
        .catch((error) => {
          summaryLoadingDiv.style.display = "none";
          summaryDiv.textContent = `Error: ${error.message}`;
        });
    }
  
    // Summarize button click handler
    speechBtn.addEventListener("click", function () {
      // Send message to content script to extract page content
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: "extractContent" },
          function (response) {
            if (response && response.content) {
              // Show loading
              speechLoadingDiv.style.display = "block";
  
              // Call Ollama to summarize
              fetchSpeech(text);
            }
          }
        );
      });
    });
  
    async function fetchSpeech(summary) {
      fetch(
        "Azure API",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/ssml+xml",
            "Ocp-Apim-Subscription-Key":
              "98Z0AJi5eqOkUe9c9danelUqdY7DhVb13xqWkbuBHtRNXgw4Go0PJQQJ99AKACYeBjFXJ3w3AAAYACOGvO1A",
            "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3",
          },
          body: `<speak version='1.0' xmlns="http://www.w3.org/2001/10/synthesis" xml:lang='en-US'><voice name='en-US-JennyNeural'>${summary}</voice></speak>`,
        }
      )
        .then((res) => {
          return res.arrayBuffer();
        })
        .then((audioData) => {
          const audioContext = new AudioContext();
          return audioContext.decodeAudioData(audioData)
        }).then((audioBuffer) => {
          const audioContext = new AudioContext();
          const source = audioContext.createBufferSource();
          source.buffer = audioBuffer;
          source.connect(audioContext.destination);
          source.start(0);
          speechLoadingDiv.style.display = "none";
        })
        .catch((err) => console.log(err));
    }
  });