# Webpage Summarizer with GPT-3.5 and Azure Text-to-Speech

## Overview

This project is a **webpage summarization chrome extension** that uses **OpenAI's GPT-3.5** to generate concise summaries of the current webpage and **Azure Text-to-Speech** to read the summaries aloud. Built as part of a class project, the tool showcases the integration of AI models and cloud services for enhancing content accessibility and productivity.

## Features

* ✅ **Automatic Webpage Summarization** using OpenAI's GPT-3.5
* 🔊 **Audio Playback** of the generated summary using Azure's Text-to-Speech API
* 🌐 **Chrome Extension / Web App** (Specify based on your implementation)
* 🎯 **Real-time Page Context**: Summarizes the content of the webpage you're currently viewing
* 💡 Designed with usability and accessibility in mind

## How It Works

1. The tool captures the visible text content from the current webpage.
2. The extracted text is sent to OpenAI's GPT-3.5 API with a prompt to generate a brief summary.
3. The generated summary is displayed to the user.
4. Azure Text-to-Speech converts the summary into spoken audio, which can be played back via the browser.

## Tech Stack

* 🧠 **GPT-3.5** (via OpenAI API) for natural language summarization
* 🗣️ **Azure Text-to-Speech** for converting text summaries into audio
* 🛠️ **JavaScript / HTML / CSS** for front-end interface
* (Optional) 📦 **Chrome Extension** APIs for browser integration

## Setup Instructions

### Prerequisites

* Node.js and npm (if using a build system)
* OpenAI API key
* Azure Cognitive Services key and region (for TTS)

## Limitations

* GPT-3.5 has input length limits — very large pages may be truncated.
* Requires internet connection for both APIs.
* Performance and quality depend on the accuracy of text extraction.

## Future Improvements

* Add language selection for TTS output
* Improve webpage text extraction (e.g., skipping ads, navbars)
* Store summaries for offline access
