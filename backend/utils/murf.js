import axios from "axios";

export const generateSpeech = async (text) => {
  try {
    const response = await axios.post(
      "https://api.murf.ai/v1/text-to-speech",
      {
        voice: "alloy",
        input: text
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.MURF_API_KEY}`,
          "Content-Type": "application/json"
        },
        responseType: "arraybuffer"
      }
    );
    return response.data;
  } catch (err) {
    console.error("Murf error:", err);
    return null;
  }
};
