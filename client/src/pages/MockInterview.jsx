import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../configs/axios";

export default function MockInterview() {
  const navigate = useNavigate();

  const [domain, setDomain] = useState("Full Stack Dev");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  const generateQuestion = async () => {
    try {
      setLoading(true);

      const { data } = await API.post(
        "/ai/interview-question",
        { domain }
      );

      setQuestion(data.question);
      setFeedback("");
      setScore(null);
      setAnswer("");
      setXpEarned(0);
    } catch (err) {
      console.error(err);
      alert("Failed to generate question");
    }

    setLoading(false);
  };

  const evaluateAnswer = async () => {
    if (!answer) {
      alert("Please enter your answer");
      return;
    }

    try {
      setLoading(true);

      const { data } = await API.post(
        "/ai/evaluate-answer",
        {
          domain,
          question,
          answer,
        }
      );

      setScore(data.score);
      setFeedback(data.feedback);

      let rewardXP = 20;

      if (data.score >= 9) {
        rewardXP = 100;
      } else if (data.score >= 7) {
        rewardXP = 75;
      } else if (data.score >= 5) {
        rewardXP = 50;
      }

      await API.post("/xp/reward", {
        xp: rewardXP,
      });

      setXpEarned(rewardXP);
    } catch (err) {
      console.error(err);
      alert("Evaluation failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700">

      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl"
          >
            ← Back
          </button>

          <h1 className="text-2xl font-black">
            🎤 AI Mock Interview
          </h1>

        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6">

        {/* Domain Selection */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">

          <h2 className="text-xl font-bold mb-4">
            Select Domain
          </h2>

          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full border rounded-xl px-4 py-3"
          >
            <option>Full Stack Dev</option>
            <option>AI/ML Engineer</option>
            <option>Cybersecurity</option>
            <option>Data Analyst</option>
            <option>DevOps Engineer</option>
            <option>UI/UX Designer</option>
          </select>

          <button
            onClick={generateQuestion}
            disabled={loading}
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold"
          >
            {loading
              ? "Generating..."
              : "Generate Question"}
          </button>

        </div>

        {/* Question Card */}
        {question && (
          <div className="bg-white rounded-3xl p-6 shadow-lg">

            <h2 className="text-xl font-bold mb-4">
              Interview Question
            </h2>

            <div className="bg-blue-50 p-4 rounded-xl mb-6 text-lg">
              {question}
            </div>

            <textarea
              value={answer}
              onChange={(e) =>
                setAnswer(e.target.value)
              }
              rows={8}
              placeholder="Type your answer here..."
              className="w-full border rounded-xl p-4"
            />

            <button
              onClick={evaluateAnswer}
              disabled={loading}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold"
            >
              {loading
                ? "Evaluating..."
                : "Evaluate Answer"}
            </button>

            {score !== null && (
              <div className="mt-6">

                <div className="bg-green-100 rounded-2xl p-5 mb-4">

                  <h3 className="font-bold text-2xl">
                    Score: {score}/10
                  </h3>

                  <p className="mt-2 text-green-700 font-bold">
                    ⚡ XP Earned: +{xpEarned}
                  </p>

                </div>

                <div className="bg-gray-100 rounded-2xl p-5 whitespace-pre-wrap">
                  {feedback}
                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}