import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../configs/axios';

const CAREERS = [
  { id: "Full Stack Dev", icon: "💻", desc: "React, Node.js, MongoDB" },
  { id: "AI/ML Engineer", icon: "🤖", desc: "Python, TensorFlow, ML" },
  { id: "UI/UX Designer", icon: "🎨", desc: "Figma, Design Systems" },
  { id: "Data Analyst", icon: "📊", desc: "SQL, Tableau, Python" },
  { id: "DevOps Engineer", icon: "⚙️", desc: "Docker, AWS, Kubernetes" },
  { id: "Cybersecurity", icon: "🔐", desc: "Ethical Hacking, Security" },
];

export default function Register() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', email: '', password: '', career: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!form.career) return setError('Please select a career track!');
    setLoading(true);
    try {
      const { data } = await API.post('/auth/register', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Register failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-400 to-purple-400">

      {/* Left Panel */}
      <div className="hidden lg:flex w-1/2  flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute top-10 left-10 w-40 h-40 bg-pink-200/40 rounded-full blur-2xl" />
        <div className="absolute bottom-10 right-10 w-56 h-56 bg-rose-400/30 rounded-full blur-3xl" />

        <div className="relative z-10 text-center">
          <div className="text-8xl mb-8">🎯</div>
          <h1 className="text-4xl font-black text-white mb-4 leading-tight">
            Start Your<br/>Journey Today
          </h1>
          <p className="text-pink-100 text-base mb-10">
            Join thousands of students getting<br/>placement ready!
          </p>
          <div className="flex flex-col gap-3 text-left">
            {[
              ['1️⃣', 'Pick your career track'],
              ['2️⃣', 'Complete daily lectures'],
              ['3️⃣', 'Pass quizzes & earn XP'],
              ['4️⃣', 'Get placed! 🎉'],
            ].map(([icon, text]) => (
              <div key={text} className="flex items-center gap-3 bg-white/20 border border-white/30 rounded-xl px-4 py-3">
                <span className="text-lg">{icon}</span>
                <span className="text-white text-sm font-semibold">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-rose-50 via-orange-50 to-teal-50 flex items-center justify-center px-8 py-10">
        <div className="w-full max-w-md">

          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2].map(s => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black transition
                  ${step >= s ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                  {s}
                </div>
                {s < 2 && <div className={`w-12 h-1 rounded-full ${step > s ? 'bg-green-500' : 'bg-gray-200'}`} />}
              </div>
            ))}
            <span className="text-xs text-gray-400 ml-2">{step === 1 ? 'Your Details' : 'Pick Career'}</span>
          </div>

          {error && (
            <div className="bg-teal-300 border border-red-300 text-red-600 rounded-xl px-4 py-3 mb-5 text-sm">
              ⚠️ {error}
            </div>
          )}

          {/* Step 1 - Details */}
          {step === 1 && (
            <>
              <div className="mb-6">
                <h2 className="text-3xl font-black text-gray-800">Create account 🚀</h2>
                <p className="text-gray-500 mt-1 text-sm">Fill in your details to get started</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-gray-600 text-xs font-bold mb-2 block uppercase tracking-widest">Full Name</label>
                  <input type="text" placeholder="Your full name" value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all shadow-sm" />
                </div>
                <div>
                  <label className="text-gray-600 text-xs font-bold mb-2 block uppercase tracking-widest">Email</label>
                  <input type="email" placeholder="your@email.com" value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all shadow-sm" />
                </div>
                <div>
                  <label className="text-gray-600 text-xs font-bold mb-2 block uppercase tracking-widest">Password</label>
                  <input type="password" placeholder="Create a password" value={form.password}
                    onChange={e => setForm({...form, password: e.target.value})}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition-all shadow-sm" />
                </div>
              </div>

              <button onClick={() => {
                if (!form.name || !form.email || !form.password) return setError('Please fill all fields!');
                setError('');
                setStep(2);
              }}
                className="w-full mt-7 bg-pink-500 hover:bg-pink-400 text-white font-bold rounded-xl py-4 text-sm transition cursor-pointer">
                Next → Pick Your Career
              </button>

              <p className="text-gray-500 text-sm text-center mt-5">
                Already have an account?{' '}
                <Link to="/login" className="text-teal-500 font-bold hover:text-teal-400 transition">Login →</Link>
              </p>
            </>
          )}

          {/* Step 2 - Career Selection */}
          {step === 2 && (
            <>
              <div className="mb-6">
                <h2 className="text-3xl font-black text-gray-800">Pick your track 🎯</h2>
                <p className="text-gray-500 mt-1 text-sm">Choose your career domain to get started</p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-7">
                {CAREERS.map(c => (
                  <div key={c.id} onClick={() => setForm({...form, career: c.id})}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition text-center
                      ${form.career === c.id ? 'border-pink-400 bg-pink-50' : 'border-gray-200 bg-white hover:border-pink-200'}`}>
                    <div className="text-3xl mb-2">{c.icon}</div>
                    <p className="font-bold text-gray-800 text-xs">{c.id}</p>
                    <p className="text-gray-400 text-xs mt-1">{c.desc}</p>
                  </div>
                ))}
              </div>

              <button onClick={handleSubmit} disabled={loading || !form.career}
                className="w-full bg-pink-500 hover:bg-pink-400 text-white font-bold rounded-xl py-4 text-sm transition cursor-pointer disabled:opacity-50">
                {loading ? 'Creating account...' : '🎉 Start My Journey!'}
              </button>

              <button onClick={() => setStep(1)}
                className="w-full mt-3 text-gray-400 text-sm hover:text-gray-600 transition cursor-pointer">
                ← Back
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}