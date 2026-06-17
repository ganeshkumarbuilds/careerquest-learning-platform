import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../configs/axios';

const QUIZZES = [
{
    level: 1, title: "Web Foundations Quiz",
    questions: [
    { q: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Transfer Markup Language", "None"], answer: 0 },
    { q: "Which CSS property controls text size?", options: ["font-weight", "text-size", "font-size", "text-style"], answer: 2 },
    { q: "Which keyword declares a variable in modern JS?", options: ["var", "let", "const", "Both let and const"], answer: 3 },
    ]
},
{
    level: 2, title: "JavaScript Deep Dive Quiz",
    questions: [
      { q: "What does async/await do?", options: ["Handles errors", "Handles async operations", "Loops arrays", "None"], answer: 1 },
      { q: "What is a Promise?", options: ["A loop", "An object for async operations", "A function", "A variable"], answer: 1 },
      { q: "What does the fetch API do?", options: ["Fetches HTML", "Makes HTTP requests", "Loops data", "None"], answer: 1 },
    ]
  },
  {
    level: 3, title: "React & Frontend Quiz",
    questions: [
      { q: "What is JSX?", options: ["A database", "JavaScript XML syntax", "A CSS framework", "None"], answer: 1 },
      { q: "Which hook manages state in React?", options: ["useEffect", "useContext", "useState", "useRef"], answer: 2 },
      { q: "What is React Router used for?", options: ["State management", "API calls", "Navigation between pages", "Styling"], answer: 2 },
    ]
  },
  {
    level: 4, title: "Node.js & Backend Quiz",
    questions: [
      { q: "What is Express.js?", options: ["A database", "A frontend framework", "A Node.js web framework", "A CSS library"], answer: 2 },
      { q: "What does JWT stand for?", options: ["Java Web Token", "JSON Web Token", "JavaScript Web Transfer", "None"], answer: 1 },
      { q: "What is MongoDB?", options: ["SQL database", "NoSQL database", "A server", "A frontend tool"], answer: 1 },
    ]
  },
  {
    level: 5, title: "DSA Quiz",
    questions: [
      { q: "What is the time complexity of binary search?", options: ["O(n)", "O(n²)", "O(log n)", "O(1)"], answer: 2 },
      { q: "What data structure uses LIFO?", options: ["Queue", "Stack", "Array", "Graph"], answer: 1 },
      { q: "What is BFS used for?", options: ["Sorting", "Shortest path in graph", "Searching arrays", "None"], answer: 1 },
    ]
  },
  {
    level: 6, title: "Full Stack Projects Quiz",
    questions: [
      { q: "What is Socket.io used for?", options: ["Database queries", "Real-time communication", "Styling", "Testing"], answer: 1 },
      { q: "What does CI/CD stand for?", options: ["Code Integration/Code Deployment", "Continuous Integration/Continuous Deployment", "None", "Both A and B"], answer: 1 },
      { q: "What is a REST API?", options: ["A database", "An architectural style for APIs", "A frontend framework", "None"], answer: 1 },
    ]
  },
  {
    level: 7, title: "Interview Ready Quiz",
    questions: [
      { q: "What is System Design?", options: ["Designing UI", "Designing scalable software architecture", "Writing code", "None"], answer: 1 },
      { q: "What is the STAR method?", options: ["A coding pattern", "Situation Task Action Result for HR", "A design pattern", "None"], answer: 1 },
      { q: "What is load balancing?", options: ["Balancing code", "Distributing traffic across servers", "Managing databases", "None"], answer: 1 },
    ]
  },
];

export default function Quiz() {
  const [levelIdx, setLevelIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const quiz = QUIZZES[levelIdx];
  const userLevel = parseInt(localStorage.getItem('userLevel') || '1');

  const showToast = (msg, color) => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async () => {
    const score = quiz.questions.filter((q, i) => answers[i] === q.answer).length;
    setSubmitted(true);
    setResult(score);
    try {
      const { data } = await API.post('/quiz/submit', {
        quizKey: `quiz-level-${levelIdx + 1}`,
        score
      });
      if (data.passed) showToast(`+150 XP! Quiz Passed! 🎉`, 'bg-green-500');
      else showToast('Score too low. Try again!', 'bg-red-500');
    } catch {
      showToast('Already completed this quiz!', 'bg-gray-500');
    }
  };

  const reset = () => {
    setAnswers({});
    setSubmitted(false);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-teal-50">
      {toast && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 ${toast.color} text-white px-6 py-3 rounded-2xl font-bold text-sm z-50 shadow-lg`}>
          {toast.msg}
        </div>
      )}

      <nav className="bg-white/80 backdrop-blur border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-3">
          <button onClick={() => navigate('/roadmap')} className="text-gray-400 hover:text-gray-600 cursor-pointer">←</button>
          <span className="text-xl font-black text-gray-800">🧠 Quiz</span>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-8">

        {/* Level Selector */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
          {QUIZZES.map((q, i) => (
            <button key={i} onClick={() => { setLevelIdx(i); reset(); }}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-bold transition cursor-pointer
                ${levelIdx === i ? 'bg-pink-500 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-pink-300'}`}>
              Level {q.level}
            </button>
          ))}
        </div>

        {/* Quiz Card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-black text-gray-800 mb-2">{quiz.title}</h2>
          <p className="text-gray-400 text-sm mb-8">Answer all 3 questions. Score 2/3 to earn +150 XP!</p>

          <div className="flex flex-col gap-8">
            {quiz.questions.map((q, qi) => (
              <div key={qi}>
                <p className="font-bold text-gray-800 mb-3">Q{qi + 1}. {q.q}</p>
                <div className="flex flex-col gap-2">
                  {q.options.map((opt, oi) => {
                    let style = 'bg-gray-50 border border-gray-200 text-gray-700 hover:border-pink-300';
                    if (submitted) {
                      if (oi === q.answer) style = 'bg-green-50 border border-green-400 text-green-700';
                      else if (answers[qi] === oi) style = 'bg-red-50 border border-red-400 text-red-700';
                    } else if (answers[qi] === oi) {
                      style = 'bg-pink-50 border border-pink-400 text-pink-700';
                    }
                    return (
                      <button key={oi} onClick={() => !submitted && setAnswers({ ...answers, [qi]: oi })}
                        className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${style}`}>
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Result */}
          {submitted && (
            <div className={`mt-8 p-5 rounded-2xl text-center ${result >= 2 ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <p className="text-3xl font-black mb-2">{result >= 2 ? '🎉 Passed!' : '😢 Failed'}</p>
              <p className="font-bold text-gray-700">Score: {result}/3</p>
              <p className="text-sm text-gray-500 mt-1">{result >= 2 ? '+150 XP earned!' : 'Need 2/3 to pass. Try again!'}</p>
              {result < 2 && (
                <button onClick={reset}
                  className="mt-4 bg-orange-400 text-white px-6 py-2 rounded-xl font-bold text-sm cursor-pointer hover:bg-pink-400 transition">
                  Try Again
                </button>
              )}
            </div>
          )}

          {!submitted && (
            <button onClick={handleSubmit}
              disabled={Object.keys(answers).length < 3}
              className="w-full mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl py-4 text-sm transition cursor-pointer disabled:opacity-40">
              Submit Quiz →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}