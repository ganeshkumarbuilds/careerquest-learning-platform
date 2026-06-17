import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../configs/axios';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await API.get('/xp/dashboard');
        setUser(data);
      } catch (err) {
        localStorage.removeItem('token');
        navigate('/login');
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const thresholds = [0, 400, 900, 1800, 3000, 4500, 6500];
  const nextXP = thresholds[user?.level] || 7000;
  const currentXP = user?.xp || 0;
  const prevXP = thresholds[(user?.level || 1) - 1] || 0;
  const progress = Math.round(((currentXP - prevXP) / (nextXP - prevXP)) * 100);

  const stats = [
    { label: 'Total XP', value: user?.xp || 0, icon: '⚡', color: 'text-yellow-500', bg: 'bg-orange-200' },
    { label: 'Current Level', value: `${user?.level || 1}/7`, icon: '🎯', color: 'text-pink-500', bg: 'bg-blue-200' },
    { label: 'Day Streak', value: user?.streak || 0, icon: '🔥', color: 'text-orange-500', bg: 'bg-orange-200' },
    { label: 'Tasks Done', value: user?.completedTasks?.length || 0, icon: '✅', color: 'text-teal-500', bg: 'bg-teal-200' },
    { label: 'Quizzes Passed', value: user?.quizzesPassed?.length || 0, icon: '🧠', color: 'text-purple-500', bg: 'bg-purple-200' },
    { label: 'Badges', value: user?.badges?.length || 0, icon: '🎖️', color: 'text-blue-500', bg: 'bg-blue-200' },
  ];

  if (loading) return (
    <div className="min-h-screen bg-teal-300 flex items-center justify-center">
      <div className="text-center">
        <div className="text-5xl mb-4 animate-bounce">🏆</div>
        <p className="text-gray-500 font-semibold">Loading your journey...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 to-teal-400">

      {/* Navbar */}
      <nav className="bg-w/80 backdrop-blur border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🏆</span>
            <span className="text-4xl font-medium text-gray-800">CareerQuest</span>
          </div>
          <div className="flex items-center gap-4  ">
            <div className="flex items-center gap-2 bg-orange-200 border border-yellow-200 rounded-full px-4 py-1.5">
              <span>⚡</span>
              <span className="text-yellow-600 font-bold text-sm">{user?.xp} XP</span>
            </div>
            <div className="flex items-center gap-2 bg-green-300 border border-orange-200 rounded-full px-4 py-1.5">
              <span>🔥</span>
              <span className="text-orange-600  font-bold text-sm">{user?.streak} days</span>
            </div>
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-4 py-2 rounded-xl transition cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-800">
            Hey {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-gray-900 mt-1">Keep going! You're on Level {user?.level} of your journey.</p>
        </div>

        {/* XP Progress Card */}
        <div className="bg-teal-400 rounded-3xl border border-gray-100 shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-gray-800 uppercase tracking-widest font-bold mb-1">Current Level</p>
              <p className="text-2xl font-black text-gray-800">Level {user?.level} <span className="text-pink-500">→</span> Level {(user?.level || 0) + 1}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-800 uppercase tracking-widest font-bold mb-1">XP Progress</p>
              <p className="text-2xl font-black text-gray-800">{currentXP} <span className="text-gray-800 font-normal text-lg">/ {nextXP}</span></p>
            </div>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
            <div
              className="h-full bg-yellow-400 rounded-full transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-800 mt-2">{progress}% to next level</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {stats.map(s => (
            <div key={s.label} className="bg-red-200 text-slate-900 rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
              <div className={`${s.bg} w-12 h-12 rounded-xl flex items-center justify-center text-2xl`}>
                {s.icon}
              </div>
              <div>
                <p className="text-2xl font-black text-gray-800">{s.value}</p>
                <p className="text-xs text-gray-900 font-medium">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Career Track + Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Current Career */}
          <div className="bg-green-300 rounded-3xl border border-gray-100 shadow-sm p-6">
            <p className="text-xs text-gray-800 uppercase tracking-widest font-bold mb-4">Your Career Track</p>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center text-3xl">💻</div>
              <div>
                <p className="font-black text-gray-800 text-lg">{user?.career || 'Full Stack Dev'}</p>
                <p className="text-gray-800 text-sm">Level {user?.level} of 7</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/roadmap')}
              className="w-full bg-gradient-to-br from-indigo-600 to-purple-600 hover:bg-indigo-700 text-white font-bold rounded-xl py-3 text-sm transition cursor-pointer"
            >
              Continue Learning →
            </button>
          </div>

          {/* Quick Actions */}
          <div className=" bg-indigo-400 grid rounded-3xl border border-gray-100 shadow-sm p-6">
            <p className="text-xs text-gray-800 uppercase tracking-widest font-bold mb-4">Quick Actions</p>
            <div className="grid grid-cols-2 gap-3">
              {[
  {
    icon: '🗺️',
    label: 'View Roadmap',
    path: '/roadmap',
    color: 'bg-pink-50 text-pink-600 hover:bg-pink-100'
  },
  {
  icon: "🎯",
  label: "Daily Missions",
  path: "/missions",
  color: "bg-yellow-50 text-yellow-600 hover:bg-yellow-100"
},
  
  {
    icon: '🏆',
    label: 'Leaderboard',
    path: '/leaderboard',
    color: 'bg-teal-50 text-teal-600 hover:bg-teal-100'
  },
  {
    icon: '📺',
    label: 'Daily Lectures',
    path: '/lectures',
    color: 'bg-orange-50 text-orange-600 hover:bg-orange-100'
  },
  {
    icon: '🎖️',
    label: 'My Badges',
    path: '/badges',
    color: 'bg-purple-50 text-purple-600 hover:bg-purple-100'
  },
  {
  icon: "🎓",
  label: "Certificate",
  path: "/certificate",
  color:
    "bg-green-50 text-green-600 hover:bg-green-100"
},
  
  {
    icon: '🧠',
    label: 'AI Quiz',
    path: '/ai-quiz',
    color: 'bg-green-50 text-green-600 hover:bg-green-100'
  },
  {
    icon: '📄',
    label: 'Resume ATS Check',
    path: '/resume',
    color: 'bg-blue-50 text-blue-600 hover:bg-blue-100'
  },
  {
  icon: "💼",
  label: "Internships",
  path: "/internships",
  color: "bg-cyan-50 text-cyan-600 hover:bg-cyan-100"
},
  
  {
    icon: '🤖',
    label: 'AI Career Advisor',
    path: '/career-advisor',
    color: 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
  },
  
  {
    icon: '🎤',
    label: 'Mock Interview',
    path: '/mock-interview',
    color: 'bg-red-50 text-red-600 hover:bg-red-100'
  },
  {
  icon: "💼",
  label: "Jobs",
  path: "/jobs",
  color: "bg-yellow-50 text-yellow-600 hover:bg-yellow-100"
}
].map(a => (
                <button
                  key={a.label}
                  onClick={() => navigate(a.path)}
                  className={`flex items-center gap-3 ${a.color} rounded-xl px-4 py-3 text-sm font-bold transition cursor-pointer`}
                >
                  <span className="text-xl">{a.icon}</span>
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}