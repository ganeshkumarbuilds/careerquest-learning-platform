import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../configs/axios";

export default function CareerAdvisor() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message;

    setChat((prev) => [
      ...prev,
      {
        type: "user",
        text: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const { data } = await API.post(
        "/ai/career-advice",
        {
          message: userMessage,
        }
      );

      setChat((prev) => [
        ...prev,
        {
          type: "ai",
          text: data.reply,
        },
      ]);
    } catch (err) {
      setChat((prev) => [
        ...prev,
        {
          type: "ai",
          text: "❌ Failed to get AI response",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">

      {/* Navbar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-green-400 hover:bg-green-500 px-4 py-2 rounded-xl"
          >
            ← Back
          </button>

          <h1 className="text-2xl font-black">
            🤖 AI Career Advisor
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6">

        {/* Welcome Card */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <h2 className="text-2xl font-bold mb-2">
            Ask Anything About Your Career
          </h2>

          <p className="text-gray-600">
            Examples:
          </p>

          <ul className="mt-3 space-y-2 text-gray-700">
            <li>💻 What should I learn after React?</li>
            <li>🎯 How can I get placed in 6 months?</li>
            <li>📚 Give me a roadmap for Full Stack Developer</li>
            <li>🧠 What DSA topics should I focus on?</li>
          </ul>
        </div>

        {/* Chat Window */}
        <div className="bg-white rounded-3xl shadow-lg h-[500px] overflow-y-auto p-6 mb-6">
          {chat.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-400">
              Start chatting with AI 🚀
            </div>
          ) : (
            <div className="space-y-4">
              {chat.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.type === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl whitespace-pre-wrap ${
                      msg.type === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                    🤖 Thinking...
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input */}
        <div className="bg-white rounded-3xl shadow-lg p-4 flex gap-3">
          <input
            type="text"
            placeholder="Ask your career question..."
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            onKeyDown={(e) =>
              e.key === "Enter" && sendMessage()
            }
            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 outline-none"
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold cursor-pointer px-6 py-3 rounded-xl"
          >
            Send 🚀
          </button>
        </div>
      </div>
    </div>
  );
}