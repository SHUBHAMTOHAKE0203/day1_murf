// backend/utils/deepgram.js
import { Deepgram } from "@deepgram/sdk";

// v3 initialization requires object with apiKey
const deepgram = new Deepgram({ apiKey: process.env.DEEPGRAM_API_KEY });

export const transcribeAudio = async (audioBuffer) => {
  try {
    // v3 preRecorded transcription
    const response = await deepgram.transcription.preRecorded(
      { buffer: audioBuffer, mimetype: "audio/wav" },
      { punctuate: true }
    );

    return response.results.channels[0].alternatives[0].transcript;
  } catch (err) {
    console.error("Deepgram error:", err);
    return "";
  }
};
