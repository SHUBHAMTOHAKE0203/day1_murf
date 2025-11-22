import { useState, useRef, useEffect } from "react";
import './App.css';

function App() {
  const [inputText, setInputText] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const sessionId = useRef(Date.now().toString());
  const chatEndRef = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation, loading]);

  // Add message to conversation
  const addMessage = (role, text, audioUrl = null) => {
    setConversation(prev => [...prev, { role, text }]);
    if (role === "agent" && audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  // Send message to backend
  const handleSend = async () => {
    if (!inputText.trim()) return;
    addMessage("user", inputText); // user msg NOT read aloud
    setInputText("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/voice-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText, sessionId: sessionId.current }),
      });
      const data = await res.json();
      addMessage("agent", data.text, data.audio_url); // agent msg read aloud
    } catch (err) {
      console.error(err);
      addMessage("agent", "Oops! Something went wrong.");
    }

    setLoading(false);
  };

  // Speech recognition (Web Speech API)
  const handleSpeak = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      setInputText(spokenText);
      handleSend();
    };
    recognition.start();
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">AI Voice Agent</h1>

      <div className="w-full max-w-xl bg-white rounded-xl shadow-md p-4 flex flex-col h-[500px] overflow-y-auto mb-4">
        {conversation.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
            <p className={`${msg.role === "user" ? "bg-blue-200 text-blue-900" : "bg-green-200 text-green-900"} inline-block px-4 py-2 rounded-xl`}>
              {msg.text}
            </p>
          </div>
        ))}
        {loading && <div className="text-gray-500 animate-pulse">Agent is thinking...</div>}
        <div ref={chatEndRef}></div>
      </div>

      <div className="flex w-full max-w-xl gap-2">
        <input
          className="flex-1 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          placeholder="Type your question..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
          onClick={handleSend}
        >
          Send
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600"
          onClick={handleSpeak}
        >
          OR You Can Speak :)
        </button>
      </div>
    </div>
  );
}

export default App;
