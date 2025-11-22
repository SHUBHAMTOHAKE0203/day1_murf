import React, { useState, useRef } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function VoiceRoom() {
  const [messages, setMessages] = useState([]); // {sender: 'user'|'ai', text: ''}
  const [input, setInput] = useState("");
  const audioRef = useRef(null);

  // Send typed message or AI voice
  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message to messages
    setMessages(prev => [...prev, { sender: "user", text: input }]);

    // Get AI response (simulated here or via AI API)
    const aiText = `AI Response to: "${input}"`;

    // Add AI text to messages
    setMessages(prev => [...prev, { sender: "ai", text: aiText }]);

    // Get AI speech
    const res = await axios.post(`${BACKEND_URL}/speak`, { text: aiText }, { responseType: "blob" });
    const url = URL.createObjectURL(res.data);
    audioRef.current.src = url;
    audioRef.current.play();

    setInput("");
  };

  return (
    <div className="p-4">
      <div className="border p-2 h-64 overflow-y-auto mb-4">
        {messages.map((m, idx) => (
          <div key={idx} className={m.sender === "user" ? "text-right" : "text-left"}>
            <span className={m.sender === "user" ? "text-blue-500" : "text-green-500"}>{m.text}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="border p-2 flex-1"
        />
        <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-2 rounded">
          Send
        </button>
      </div>
      <audio ref={audioRef} controls hidden />
    </div>
  );
}

export default VoiceRoom;
