import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ATS_KEYWORDS = {
  "Full Stack Dev": ["react", "node", "mongodb", "express", "javascript", "html", "css", "api", "git", "sql", "typescript", "redux"],
  "AI/ML Engineer": ["python", "machine learning", "tensorflow", "pytorch", "numpy", "pandas", "scikit", "nlp", "deep learning", "keras"],
  "UI/UX Designer": ["figma", "wireframe", "prototype", "user research", "design system", "ux", "ui", "adobe", "sketch", "typography"],
  "Data Analyst": ["sql", "python", "tableau", "power bi", "excel", "pandas", "analytics", "dashboard", "visualization", "statistics"],
  "DevOps Engineer": ["docker", "kubernetes", "aws", "ci/cd", "linux", "jenkins", "terraform", "ansible", "git", "nginx"],
  "Cybersecurity": ["security", "penetration testing", "network", "firewall", "linux", "ethical hacking", "vulnerability", "encryption", "siem"],
};

const TIPS = [
  "Use bullet points for each achievement",
  "Quantify achievements: 'Increased performance by 40%'",
  "Keep resume to 1 page for freshers",
  "Add GitHub and LinkedIn profile links",
  "Use action verbs: Built, Developed, Implemented",
  "Include tech stack clearly in projects section",
  "No photos or personal info like DOB/address",
  "Use standard fonts: Arial, Calibri, Times New Roman",
  "Tailor your resume for each job application",
  "Proofread for grammar and spelling errors",
];

export default function Resume() {
  const [file, setFile] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [score, setScore] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const career = user.career || 'Full Stack Dev';
  const keywords = ATS_KEYWORDS[career] || ATS_KEYWORDS['Full Stack Dev'];

  const handleFile = (f) => {
    if (!f) return;
    const allowed = ['application/pdf', 'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (!allowed.includes(f.type)) {
      alert('Please upload PDF, DOC, DOCX or TXT file!');
      return;
    }
    setFile(f);
    setScore(null);
    setAnalysis(null);

    // Read file as text
    const reader = new FileReader();
    reader.onload = (e) => setResumeText(e.target.result);
    reader.readAsText(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const analyzeResume = () => {
    if (!resumeText.trim()) return;
    setLoading(true);

    setTimeout(() => {
      const text = resumeText.toLowerCase();

      const foundKeywords = keywords.filter(k => text.includes(k));
      const missingKeywords = keywords.filter(k => !text.includes(k));

      const sections = {
        'Contact Info': text.includes('email') || text.includes('phone') || text.includes('@'),
        'Education': text.includes('education') || text.includes('university') || text.includes('college') || text.includes('b.tech') || text.includes('degree'),
        'Skills': text.includes('skills') || text.includes('technologies'),
        'Projects': text.includes('project'),
        'Experience': text.includes('experience') || text.includes('internship') || text.includes('worked'),
        'GitHub/LinkedIn': text.includes('github') || text.includes('linkedin'),
      };

      const keywordScore = Math.round((foundKeywords.length / keywords.length) * 40);
      const sectionScore = Math.round((Object.values(sections).filter(Boolean).length / 6) * 40);
      const lengthScore = resumeText.length > 500 ? 20 : Math.round((resumeText.length / 500) * 20);
      const totalScore = keywordScore + sectionScore + lengthScore;

      setScore(totalScore);
      setAnalysis({ foundKeywords, missingKeywords, sections, keywordScore, sectionScore, lengthScore });
      setLoading(false);
    }, 1500);
  };

  const getScoreColor = (s) => s >= 80 ? 'text-green-600' : s >= 60 ? 'text-yellow-600' : 'text-red-500';
  const getScoreBg = (s) => s >= 80 ? 'bg-green-50 border-green-200' : s >= 60 ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200';
  const getScoreLabel = (s) => s >= 80 ? '🎉 Excellent! ATS Ready' : s >= 60 ? '⚠️ Good, needs improvement' : '❌ Needs major improvement';

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-teal-50">

      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/dashboard')} className="text-gray-400 hover:text-gray-600 cursor-pointer">←</button>
            <span className="text-xl font-black text-gray-800">📄 Resume ATS Checker</span>
          </div>
          <div className="bg-pink-50 border border-pink-200 rounded-full px-4 py-1.5 text-pink-600 font-bold text-sm">
            Track: {career}
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Left - Upload */}
          <div>
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 mb-4">
              <h2 className="text-xl font-black text-gray-800 mb-2">Upload Your Resume</h2>
              <p className="text-gray-400 text-sm mb-5">Supports PDF, DOC, DOCX, TXT files</p>

              {/* Drop Zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => document.getElementById('resumeFile').click()}
                className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition
                  ${dragOver ? 'border-pink-400 bg-pink-50' : file ? 'border-green-400 bg-green-50' : 'border-gray-200 hover:border-pink-300 hover:bg-pink-50/50'}`}
              >
                <input
                  id="resumeFile"
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files[0])}
                />

                {file ? (
                  <>
                    <div className="text-4xl mb-3">✅</div>
                    <p className="font-black text-green-600 text-lg">{file.name}</p>
                    <p className="text-gray-400 text-sm mt-1">{(file.size / 1024).toFixed(1)} KB</p>
                    <p className="text-xs text-gray-400 mt-3">Click to change file</p>
                  </>
                ) : (
                  <>
                    <div className="text-5xl mb-4">📄</div>
                    <p className="font-black text-gray-700 text-lg">Drop your resume here</p>
                    <p className="text-gray-400 text-sm mt-2">or click to browse files</p>
                    <p className="text-xs text-gray-300 mt-3">PDF, DOC, DOCX, TXT supported</p>
                  </>
                )}
              </div>

              {file && (
                <button
                  onClick={analyzeResume}
                  disabled={loading}
                  className="w-full mt-5 bg-gradient-to-br from bg-indigo-400 to-purple-400 hover:bg-indigo-600 text-white font-bold rounded-xl py-4 text-sm transition cursor-pointer disabled:opacity-40"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                      Analyzing Resume...
                    </span>
                  ) : '🔍 Check ATS Score'}
                </button>
              )}
            </div>

            {/* Keywords */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-black text-gray-800 mb-3">🎯 Keywords for {career}</h3>
              <p className="text-xs text-gray-400 mb-4">These keywords should appear in your resume</p>
              <div className="flex flex-wrap gap-2">
                {keywords.map(k => (
                  <span key={k} className={`px-3 py-1 rounded-full text-xs font-bold
                    ${analysis?.foundKeywords.includes(k) ? 'bg-green-100 text-green-600'
                    : analysis?.missingKeywords.includes(k) ? 'bg-red-100 text-red-500'
                    : 'bg-gray-100 text-gray-500'}`}>
                    {analysis?.foundKeywords.includes(k) ? '✓ ' : analysis ? '✗ ' : ''}{k}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Results */}
          <div>
            {score !== null ? (
              <>
                {/* Score Card */}
                <div className={`rounded-3xl border p-6 mb-4 ${getScoreBg(score)}`}>
                  <div className="text-center mb-6">
                    <div className={`text-7xl font-black ${getScoreColor(score)}`}>{score}</div>
                    <div className="text-gray-500 text-sm mt-1">ATS Score / 100</div>
                    <div className={`font-bold mt-2 ${getScoreColor(score)}`}>{getScoreLabel(score)}</div>
                  </div>
                  <div className="w-full bg-white/50 rounded-full h-4 overflow-hidden mb-6">
                    <div className={`h-full rounded-full transition-all duration-1000
                      ${score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${score}%` }} />
                  </div>
                  <div className="flex flex-col gap-3">
                    {[
                      { label: 'Keywords Match', score: analysis.keywordScore, max: 40 },
                      { label: 'Resume Sections', score: analysis.sectionScore, max: 40 },
                      { label: 'Content Length', score: analysis.lengthScore, max: 20 },
                    ].map(s => (
                      <div key={s.label}>
                        <div className="flex justify-between text-xs font-bold text-gray-600 mb-1">
                          <span>{s.label}</span><span>{s.score}/{s.max}</span>
                        </div>
                        <div className="w-full bg-white/50 rounded-full h-2 overflow-hidden">
                          <div className="h-full bg-pink-400 rounded-full"
                            style={{ width: `${(s.score / s.max) * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sections */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 mb-4">
                  <h3 className="font-black text-gray-800 mb-4">📋 Resume Sections</h3>
                  <div className="flex flex-col gap-2">
                    {Object.entries(analysis.sections).map(([section, found]) => (
                      <div key={section} className={`flex items-center justify-between p-3 rounded-xl
                        ${found ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                        <span className="text-sm font-semibold text-gray-700">{section}</span>
                        <span className={`text-xs font-bold ${found ? 'text-green-600' : 'text-red-500'}`}>
                          {found ? '✓ Found' : '✗ Missing'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-10 text-center mb-4">
                <div className="text-6xl mb-4">📊</div>
                <p className="font-black text-gray-700 text-lg">Upload your resume</p>
                <p className="text-gray-400 text-sm mt-2">Your ATS score and analysis will appear here</p>
              </div>
            )}

            {/* Tips */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-black text-gray-800 mb-4">💡 Resume Tips</h3>
              <div className="flex flex-col gap-2">
                {TIPS.map((tip, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-teal-50 rounded-xl border border-teal-100">
                    <span className="text-teal-500 font-black text-xs mt-0.5 flex-shrink-0">{i + 1}.</span>
                    <span className="text-xs text-gray-600">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}