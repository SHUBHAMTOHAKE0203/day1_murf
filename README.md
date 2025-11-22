# AI Voice Agent (Murf Falcon + OpenRouter + React + Node.js)

A real-time **Voice AI Agent** built using **Murf Falcon TTS** and **OpenRouter LLMs** with a modern **React + Vite frontend** and **Node.js backend**.  
Speak to the agent and get instant, natural-sounding voice replies.

This project is created as part of the **Murf AI Voice Agent Challenge**.

---

## 🚀 Features

### 🎤 Voice Input
- Speak using your microphone
- Web Speech API captures speech and sends it to backend

### 🤖 LLM-Powered Responses
- Uses OpenRouter (GPT-4o-Mini or any model you choose)
- Friendly, humorous, concise agent personality

### 🗣️ Ultra-Fast Murf Falcon TTS
- Converts responses into speech in real-time
- Uses Murf v1 `/speech/stream` endpoint

### 🧠 Conversation Memory
- Full conversation history is stored in state
- Contextual replies that feel natural

### 💻 Full Stack Architecture
- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + Express
- **TTS:** Murf Falcon
- **LLM:** OpenRouter API

---

## 📁 Project Structure

root/
│── backend/
│ ├── server.js
│ ├── .env
│ └── package.json
│
│── frontend/
│ ├── src/App.jsx
│ ├── src/main.jsx
│ ├── index.html
│ └── package.json
│
└── README.md


---

## 🔧 Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

⚙️ Backend Setup (Node.js)
Install dependencies:
cd backend
npm install

Create .env file:
OPENROUTER_API_KEY=your_key_here
MURF_API_KEY=your_key_here

Start backend:
npm start


Server runs at:

http://localhost:5000

🎨 Frontend Setup (React + Vite)
Install dependencies:
cd frontend
npm install

Start frontend:
npm run dev


App will run at:

http://localhost:5173

🧪 How It Works

User speaks or types a message

Frontend sends text → backend

Backend asks OpenRouter for an LLM response

LLM output is sent to Murf Falcon for TTS

Backend returns text + 





audio

Frontend plays the agent’s voice reply

Conversation memory keeps improving replies

🛠️ APIs Used
OpenRouter LLM

Endpoint: https://openrouter.ai/api/v1/chat/completions

Model: gpt-4o-mini (configurable)

Murf Falcon TTS

Endpoint: https://global.api.murf.ai/v1/speech/stream

Model: FALCON

Format: MP3

🎯 Project Goals (Challenge Requirements)

Build a working voice agent

Connect via browser

Have a natural voice conversation

Record and upload a demo on LinkedIn

Tag Murf AI and use hashtags:

#MurfAIVoiceAgentsChallenge

#10DaysofAIVoiceAgents

🙌 Credits

Built by Your Name
Powered by Murf Falcon TTS + OpenRouter LLM

⭐ Support

If you like this project, feel free to star ⭐ the repo!

---

If you want, I can also create:
✅ A logo for the project  
✅ A banner for your GitHub repo  
✅ A LinkedIn post template  
Just tell me!
