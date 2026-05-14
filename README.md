# 🎙 Hindi Voicebot AI (RAG Based)

> A Hindi Voice Assistant powered by **React + Node.js + Flask + LangChain + Ollama + ChromaDB** that answers questions directly from a PDF using local AI.

---

# 🚀 Features

- 🎤 Hindi Voice Input
- 🔊 Hindi Voice Output
- 📄 PDF Question Answering
- 🧠 RAG (Retrieval Augmented Generation)
- 🤖 Local AI using Ollama + Mistral
- ⚡ Real-time Speech Recognition
- 📚 Chroma Vector Database
- 🔒 Strict PDF-based Answers Only

---

# 🛠 Tech Stack

## Frontend
- React.js
- Tailwind CSS
- Axios

## Backend
- Node.js
- Express.js

## AI Service
- Flask
- LangChain
- Ollama
- ChromaDB
- HuggingFace Embeddings

---

# 📁 Project Structure

```bash
project-root/
│
├── ai/
│   ├── app.py
│   ├── sample.pdf
│
├── server/
│   ├── index.js
│
├── client/
│   ├── src/
│   │   ├── App.js
│
└── README.md
```

---

# ⚙️ Prerequisites

Before running the project, install:

- Python 3.10+
- Node.js
- Ollama

---

# 📥 Step 1 — Install Ollama

Download Ollama from:

👉 https://ollama.com

After installation verify:

```bash
ollama --version
```

---

# 🤖 Step 2 — Pull Mistral Model

Run:

```bash
ollama pull mistral
```

Test model:

```bash
ollama run mistral
```

---

# 🧠 Step 3 — Setup Flask AI Service

Open terminal:

```bash
cd ai
```

Install dependencies:

```bash
pip install flask flask-cors
pip install langchain
pip install langchain-community
pip install langchain-text-splitters
pip install chromadb
pip install sentence-transformers
pip install pypdf
pip install ollama
```

---

# 📄 Step 4 — Add Your PDF

Place your PDF file inside:

```bash
ai/sample.pdf
```

---

# ▶️ Step 5 — Run Flask Server

```bash
python app.py
```

You should see:

```bash
Loading PDF...
Creating embeddings...
Loading Ollama model...
AI Service Ready!
```

Flask server runs on:

```bash
http://localhost:8000
```

---

# 🌐 Step 6 — Setup Node.js Backend

Open another terminal:

```bash
cd interviewbackend
```

Install packages:

```bash
npm install express cors axios
```

Run server:

```bash
node index.js
```

You should see:

```bash
Server running on port 5000
```

---

# 💻 Step 7 — Setup React Frontend

Open another terminal:

```bash
cd interview
```

Install dependencies:

```bash
npm install
npm install axios
```

Run React app:

```bash
npm start
```

Frontend runs on:

```bash
http://localhost:3000
```

---

# 🎤 How To Use

1. Click **Start Voicebot**
2. Speak in Hindi
3. AI retrieves answer from PDF
4. AI speaks answer in Hindi

---

# 🔄 Application Flow

```text
User Voice
    ↓
Speech Recognition
    ↓
React Frontend
    ↓
Node.js Backend
    ↓
Flask AI Service
    ↓
LangChain Retrieval
    ↓
ChromaDB Vector Search
    ↓
Mistral LLM
    ↓
Hindi Response
```

---

# 📡 API Endpoint

## POST `/api/ask`

### Request

```json
{
  "question": "भारत की राजधानी क्या है?"
}
```

### Response

```json
{
  "answer": "दिल्ली भारत की राजधानी है।"
}
```

---

# 🧠 AI Prompt Rules

The AI follows strict rules:

- Answers ONLY in Hindi
- Uses ONLY PDF content
- No hallucinations
- No guessing
- Short precise answers only

Fallback response:

```text
PDF में इस सवाल से जुड़ी जानकारी नहीं मिली।
```

---

# ❗ Common Errors

## 1. Ollama Model Not Found

Run:

```bash
ollama pull mistral
```

---

## 2. PDF Not Found

Ensure:

```bash
ai/sample.pdf
```

exists correctly.

---

## 3. CORS Error

Ensure:
- Flask running on port `8000`
- Node server running on port `5000`

---

# 🌟 Future Improvements

- Multiple PDF Upload
- Streaming AI Responses
- Conversation History
- Better Hindi Voices
- Authentication
- Docker Deployment
- Multi-language Support

---

# 📸 Demo UI

Features included:
- 🎙 Start/Stop Voicebot
- 📝 Live Transcript
- 🤖 AI Answer
- 🔊 Hindi Speech Output

---
