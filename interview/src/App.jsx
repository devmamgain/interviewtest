import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

function App() {
  const recognitionRef = useRef(null);
  const shouldListenRef = useRef(false);
  const restartTimeoutRef = useRef(null);

  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState("Idle");

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "hi-IN";

    recognition.onstart = () => {
      console.log("Speech started");
      setListening(true);
      setStatus("Listening...");
    };

    recognition.onresult = async (event) => {
      const text =
        event.results[event.results.length - 1][0].transcript;

      setTranscript(text);
      setStatus("Thinking...");

      try {
        const res = await axios.post("http://localhost:5000/api/ask", {
          question: text,
        });

        const reply = res.data.answer;

        setAnswer(reply);
        speakHindi(reply);

        setStatus("Ready");

        if (shouldListenRef.current) {
          restartRecognition();
        }
      } catch (err) {
        console.log(err);
        setStatus("API Error");
      }
    };

    recognition.onerror = (event) => {
      console.log("Speech error:", event.error);

      setStatus("Error: " + event.error);

      // ❌ IMPORTANT: ignore network error restart loop
      if (event.error === "network") {
        return;
      }

      if (shouldListenRef.current) {
        restartRecognition();
      }
    };

    recognition.onend = () => {
      console.log("Speech ended");
      setListening(false);

      if (shouldListenRef.current) {
        restartRecognition();
      }
    };

    recognitionRef.current = recognition;
  }, []);

  const restartRecognition = () => {
    if (restartTimeoutRef.current) return;

    restartTimeoutRef.current = setTimeout(() => {
      try {
        recognitionRef.current?.start();
      } catch (e) {
        console.log("Restart error:", e);
      }

      restartTimeoutRef.current = null;
    }, 1200);
  };

  const startListening = () => {
    shouldListenRef.current = true;

    try {
      recognitionRef.current.start();
    } catch (e) {
      console.log("Start error:", e);
    }
  };

  const stopListening = () => {
    shouldListenRef.current = false;

    recognitionRef.current?.stop();
    setListening(false);
    setStatus("Stopped");
  };

  const speakHindi = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "hi-IN";
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-6">

        <h1 className="text-2xl font-bold text-center mb-6">
          🎙 Hindi Voicebot
        </h1>

        <div className="flex justify-center gap-4 mb-6">
          {!listening ? (
            <button
              onClick={startListening}
              className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg"
            >
              Start Voicebot
            </button>
          ) : (
            <button
              onClick={stopListening}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
            >
              Stop Voicebot
            </button>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Status</p>
            <p className="font-medium">{status}</p>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Transcript</p>
            <p>{transcript}</p>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500">AI Answer</p>
            <p>{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;