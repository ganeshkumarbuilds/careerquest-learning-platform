import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../configs/axios";

export default function Badges() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await API.get("/xp/dashboard");
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-10 shadow-xl text-center">
          <div className="text-6xl animate-bounce mb-4">
            🏅
          </div>

          <h2 className="text-2xl font-bold">
            Loading Badges...
          </h2>
        </div>
      </div>
    );
  }

  const badges = [
    {
      icon: "🚀",
      name: "Beginner",
      unlocked: user.xp >= 50,
      description: "Earn 50 XP",
    },
    {
      icon: "⚡",
      name: "Learner",
      unlocked: user.xp >= 200,
      description: "Earn 200 XP",
    },
    {
      icon: "🔥",
      name: "Dedicated",
      unlocked: user.streak >= 7,
      description: "Maintain a 7-day streak",
    },
    {
      icon: "🏆",
      name: "Champion",
      unlocked: user.xp >= 500,
      description: "Earn 500 XP",
    },
    {
      icon: "🎯",
      name: "Master",
      unlocked: user.level >= 5,
      description: "Reach Level 5",
    },
    {
      icon: "👑",
      name: "Legend",
      unlocked: user.level >= 7,
      description: "Reach Level 7",
    },
  ];

  const unlockedCount = badges.filter(
    (badge) => badge.unlocked
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">

          <div className="flex items-center gap-4">

            <button
              onClick={() => navigate("/dashboard")}
              className="bg-white hover:bg-gray-100 px-5 py-3 rounded-2xl font-bold shadow-lg"
            >
              ← Back
            </button>

            <div>
              <h1 className="text-5xl font-black text-white">
                🏅 My Badges
              </h1>

              <p className="text-white/80 mt-2">
                Unlock achievements and level up your journey.
              </p>
            </div>

          </div>

          <div className="mt-5 md:mt-0 bg-white rounded-3xl shadow-xl px-6 py-4">

            <p className="text-gray-500 text-sm">
              Badges Unlocked
            </p>

            <h2 className="text-4xl font-black text-indigo-600">
              {unlockedCount}/{badges.length}
            </h2>

          </div>

        </div>

        {/* Progress Card */}

        <div className="bg-white rounded-3xl shadow-xl p-6 mb-8">

          <div className="flex justify-between mb-3">

            <span className="font-bold text-gray-700">
              Achievement Progress
            </span>

            <span className="font-bold text-indigo-600">
              {Math.round(
                (unlockedCount / badges.length) * 100
              )}%
            </span>

          </div>

          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">

            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-4 rounded-full"
              style={{
                width: `${
                  (unlockedCount / badges.length) * 100
                }%`,
              }}
            />

          </div>

        </div>

        {/* Badge Grid */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {badges.map((badge, index) => (

            <div
              key={index}
              className={`rounded-3xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                badge.unlocked
                  ? "bg-white"
                  : "bg-gray-100 opacity-80"
              }`}
            >

              <div className="flex justify-between items-start mb-5">

                <div className="text-5xl">
                  {badge.icon}
                </div>

                {badge.unlocked ? (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                    Unlocked
                  </span>
                ) : (
                  <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm font-bold">
                    Locked
                  </span>
                )}

              </div>

              <h2 className="text-2xl font-black text-gray-800 mb-2">
                {badge.name}
              </h2>

              <p className="text-gray-500 mb-4">
                {badge.description}
              </p>

              <div className="border-t pt-4">

                {badge.unlocked ? (
                  <p className="text-green-600 font-bold">
                    ✅ Achievement Earned
                  </p>
                ) : (
                  <p className="text-gray-500 font-medium">
                    🔒 Keep Learning
                  </p>
                )}

              </div>

            </div>

          ))}

        </div>

        {/* Achievement Banner */}

        <div className="mt-10 bg-white rounded-3xl shadow-xl p-8 text-center">

          <div className="text-6xl mb-4">
            🏆
          </div>

          <h2 className="text-3xl font-black text-gray-800">
            Keep Learning, Keep Unlocking
          </h2>

          <p className="text-gray-500 mt-3">
            Complete quizzes, missions and learning paths to earn more badges and become a CareerQuest Legend.
          </p>

        </div>

      </div>

    </div>
  );
}