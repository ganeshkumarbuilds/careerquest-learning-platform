import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../configs/axios';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await API.post('/auth/login', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex">

      {/* Left Panel - Pure Pink */}
      <div className="hidden lg:flex w-1/2 bg-green-400 flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute top-10 left-10 w-40 h-40 bg-pink-200/40 rounded-full blur-2xl" />
        <div className="absolute bottom-10 right-10 w-56 h-56 bg-rose-400/30 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-white/20 rounded-full blur-xl" />

        <div className="relative z-10 text-center">
          <div className="text-8xl mb-8 drop-shadow-lg">🏆</div>
          <h1 className="text-4xl font-black text-white mb-4 leading-tight drop-shadow">
            Level Up Your<br/>Career Journey
          </h1>
          <p className="text-pink-100 text-base mb-10 leading-relaxed">
            Complete tasks, earn XP, unlock levels<br/>and get placement ready!
          </p>

          <div className="flex gap-4 justify-center">
            {[['6', 'Career Tracks'], ['7', 'Levels Each'], ['🎖️', 'Badges']].map(([val, label]) => (
              <div key={label} className="bg-white/25 backdrop-blur-sm border border-white/30 rounded-2xl px-5 py-4 text-center">
                <div className="text-2xl font-black text-white">{val}</div>
                <div className="text-pink-100 text-xs mt-1 font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Salmon/Mint */}
      <div className="w-full lg:w-1/2 bg-rose-200 flex items-center justify-center px-8">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <span className="text-5xl">🏆</span>
            <h1 className="text-2xl font-black text-gray-800 mt-2">CareerQuest</h1>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-black text-gray-800">Welcome back 👋</h2>
            <p className="text-gray-500 mt-2 text-sm">Login in to continue your journey</p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-300 text-red-600 rounded-xl px-4 py-3 mb-6 text-sm flex items-center gap-2">
              ⚠️ {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="text-gray-600 text-xs font-bold mb-2 block uppercase tracking-widest">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all shadow-sm"
              />
            </div>

            <div>
              <label className="text-gray-600 text-xs font-bold mb-2 block uppercase tracking-widest">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={e => setForm({...form, password: e.target.value})}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition-all shadow-sm"
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full mt-7 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-xl py-4 text-sm transition-all duration-200 hover:shadow-lg hover:shadow-pink-300/40 active:scale-95 cursor-pointer disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Welcome...
              </span>
            ) : '🚀 Login'}
          </button>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-xs">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <p className="text-gray-500 text-sm text-center">
            New to CareerQuest?{' '}
            <Link to="/register" className="text-teal-500 font-bold hover:text-teal-400 transition">
              Create free account →
            </Link>
          </p>

          <p className="text-center text-gray-400 text-xs mt-8">
            Built for college students 🎓
          </p>
        </div>
      </div>
    </div>
  );
}