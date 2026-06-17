import { useEffect, useState } from "react";
import API from "../configs/axios";

export default function Badges() {
  const [user, setUser] = useState(null);

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
      <div className="min-h-screen flex items-center justify-center text-2xl">
        Loading badges...
      </div>
    );
  }

  const badges = [
    {
      name: "🚀 Beginner",
      unlocked: user.xp >= 50,
      description: "Earn 50 XP",
    },
    {
      name: "⚡ Learner",
      unlocked: user.xp >= 200,
      description: "Earn 200 XP",
    },
    {
      name: "🔥 Dedicated",
      unlocked: user.streak >= 7,
      description: "Maintain a 7-day streak",
    },
    {
      name: "🏆 Champion",
      unlocked: user.xp >= 500,
      description: "Earn 500 XP",
    },
    {
      name: "🎯 Master",
      unlocked: user.level >= 5,
      description: "Reach Level 5",
    },
    {
      name: "👑 Legend",
      unlocked: user.level >= 7,
      description: "Reach Level 7",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-4xl font-bold mb-2">🏅 My Badges</h1>

        <p className="text-gray-600 mb-8">
          Unlock badges by learning consistently and earning XP.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {badges.map((badge, index) => (
            <div
              key={index}
              className={`rounded-2xl p-6 shadow border-2 ${
                badge.unlocked
                  ? "bg-green-100 border-green-500"
                  : "bg-gray-100 border-gray-300"
              }`}
            >
              <h2 className="text-2xl font-bold mb-2">
                {badge.name}
              </h2>

              <p className="text-gray-700 mb-3">
                {badge.description}
              </p>

              <div className="font-bold">
                {badge.unlocked ? (
                  <span className="text-green-700">
                    ✅ Unlocked
                  </span>
                ) : (
                  <span className="text-gray-500">
                    🔒 Locked
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}