import OpenAI from "openai";
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function summarizeVideo(videoUrl) {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "user",
        content: `Summarize the content of this YouTube video: ${videoUrl}`,
      },
    ],
  });
  return response.choices[0].message.content;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "summarize") {
    summarizeVideo(request.videoUrl).then((summary) => {
      sendResponse({ summary });
    });
    return true; // Keep the message channel open for async response
  }
});
