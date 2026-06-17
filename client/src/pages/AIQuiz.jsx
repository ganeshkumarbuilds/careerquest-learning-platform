import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../configs/axios";

export default function AIQuiz() {
  const navigate = useNavigate();

  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);

  const [questions, setQuestions] = useState([]);

  const [answers, setAnswers] = useState({});

  const [submitted, setSubmitted] = useState(false);

  const [score, setScore] = useState(0);

  const generateQuiz = async () => {
    if (!topic) return;

    try {
      setLoading(true);

      const { data } = await API.post(
        "/ai/generate-quiz",
        { topic }
      );

      setQuestions(data.questions || []);
      setSubmitted(false);
      setAnswers({});
      setScore(0);
    } catch (err) {
      console.error(err);
      alert("Failed to generate quiz");
    }

    setLoading(false);
  };

  const submitQuiz = () => {
    let total = 0;

    questions.forEach((q, index) => {
      if (answers[index] === q.answer) {
        total++;
      }
    });

    setScore(total);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600">

      <div className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gray-100 px-4 py-2 rounded-xl"
          >
            ← Back
          </button>

          <h1 className="text-2xl font-black">
            🧠 AI Quiz Generator
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">

        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">

          <h2 className="text-xl font-bold mb-4">
            Generate Quiz Using AI
          </h2>

          <div className="flex gap-3">

            <input
              value={topic}
              onChange={(e) =>
                setTopic(e.target.value)
              }
              placeholder="React Hooks"
              className="flex-1 border rounded-xl px-4 py-3"
            />

            <button
              onClick={generateQuiz}
              disabled={loading}
              className="bg-purple-600 text-white px-6 py-3 cursor-pointer rounded-xl font-bold"
            >
              {loading
                ? "Generating..."
                : "Generate"}
            </button>

          </div>
        </div>

        {questions.length > 0 && (

          <div className="bg-white rounded-3xl p-6 shadow-lg">

            <h2 className="text-xl font-bold mb-6">
              Quiz on {topic}
            </h2>

            {questions.map((q, index) => (

              <div
                key={index}
                className="mb-8"
              >

                <h3 className="font-bold mb-3">
                  {index + 1}. {q.question}
                </h3>

                <div className="space-y-2">

                  {q.options.map(
                    (option, optionIndex) => (

                      <button
                        key={optionIndex}
                        onClick={() =>
                          !submitted &&
                          setAnswers({
                            ...answers,
                            [index]:
                              option,
                          })
                        }
                        className={`block w-full text-left px-4 py-3 rounded-xl border ${
                          answers[index] === option
                            ? "bg-purple-100 border-purple-500"
                            : "bg-gray-50"
                        }`}
                      >
                        {option}
                      </button>

                    )
                  )}

                </div>
              </div>

            ))}

            {!submitted ? (
              <button
                onClick={submitQuiz}
                className="w-full bg-green-600 text-white cursor-pointer py-4 rounded-xl font-bold"
              >
                Submit Quiz
              </button>
            ) : (
              <div className="text-center bg-green-100 rounded-2xl p-6">

                <h2 className="text-3xl font-bold">
                  🎉 Score
                </h2>

                <p className="text-xl mt-3">
                  {score} / {questions.length}
                </p>

              </div>
            )}
          </div>

        )}
      </div>
    </div>
  );
}