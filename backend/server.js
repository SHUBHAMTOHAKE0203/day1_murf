// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;
const MURF_KEY = process.env.MURF_API_KEY;

// In-memory session store (simple memory, reset on server restart)
const sessions = {};

app.post("/voice-agent", async (req, res) => {
  const { text, sessionId } = req.body;
  if (!text) return res.status(400).json({ error: "No text provided" });

  if (!sessions[sessionId]) sessions[sessionId] = [];

  // Add user message to session memory
  sessions[sessionId].push({ role: "user", content: text });

  let agentText = "Hello! I'm your business agent.";

  // 1️⃣ OpenRouter LLM with full conversation context
  try {
    if (OPENROUTER_KEY) {
      const llmResp = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `You are a helpful voice AI assistant. The user is interacting with you via voice, even if you perceive the conversation as text.
You eagerly assist users with their questions using your extensive knowledge. Your responses are concise, to the point, and without any complex formatting, punctuation, emojis, or symbols. You are curious, friendly, and have a sense of humor.`
            },
            ...sessions[sessionId]
          ],
          temperature: 0.7
        },
        {
          headers: { Authorization: `Bearer ${OPENROUTER_KEY}` },
        }
      );

      agentText = llmResp.data.choices?.[0]?.message?.content || agentText;
      sessions[sessionId].push({ role: "assistant", content: agentText });
    }
  } catch (err) {
    console.error("OpenRouter API error:", err.message);
  }

  // 2️⃣ Murf TTS (v1) - return base64 audio
  try {
    if (MURF_KEY) {
      const ttsResp = await axios.post(
        "https://global.api.murf.ai/v1/speech/stream",
        {
          text: agentText,
          voiceId: "en-US-natalie", // Female voice
          multiNativeLocale: "en-US",
          model: "FALCON",
          format: "MP3",
          sampleRate: 24000
        },
        {
          headers: { "Content-Type": "application/json", "api-key": MURF_KEY },
          responseType: "arraybuffer"
        }
      );

      const audioBase64 = Buffer.from(ttsResp.data, "binary").toString("base64");
      const audioUrl = `data:audio/mp3;base64,${audioBase64}`;

      return res.json({ text: agentText, audio_url: audioUrl });
    }
  } catch (err) {
    console.error("Murf TTS error:", err.response?.data || err.message);
  }

  // Fallback: return text only
  res.json({ text: agentText, audio_url: null });
});

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
