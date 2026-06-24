import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../configs/axios";

export default function DailyMissions() {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const { data } = await API.get("/missions");
        setMissions(data);
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    };

    fetchMissions();
  }, []);

  const handleMission = (mission) => {
    const title = mission.title.toLowerCase();

    if (title.includes("lecture")) {
      navigate("/lectures");
      return;
    }

    if (title.includes("quiz")) {
      navigate("/ai-quiz");
      return;
    }

    if (title.includes("interview")) {
      navigate("/mock-interview");
      return;
    }

    if (title.includes("resume")) {
      navigate("/resume");
      return;
    }

    if (title.includes("internship")) {
      navigate("/internships");
      return;
    }

    if (title.includes("job")) {
      navigate("/jobs");
      return;
    }

    navigate("/dashboard");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
        <div className="bg-white p-8 rounded-3xl shadow-xl text-center">
          <div className="text-6xl animate-bounce mb-4">
            🎯
          </div>

          <h2 className="text-2xl font-bold text-gray-800">
            Loading Missions...
          </h2>
        </div>
      </div>
    );
  }

  const completed = 2;
  const total = 3;
  const progress = (completed / total) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-500 p-6">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">

          <div className="flex items-center gap-4">

            <button
              onClick={() => navigate("/dashboard")}
              className="bg-white hover:bg-gray-100 px-5 py-3 rounded-2xl font-bold shadow-md transition"
            >
              ← Back
            </button>

            <div>
              <h1 className="text-5xl font-black text-white">
                🎯 Daily Missions
              </h1>

              <p className="text-white/80 mt-2">
                Complete missions and earn XP rewards.
              </p>
            </div>

          </div>

          <div className="mt-5 md:mt-0 bg-white px-6 py-4 rounded-2xl shadow-lg">

            <p className="text-sm text-gray-500 font-semibold">
              Today's Progress
            </p>

            <h2 className="text-3xl font-black text-green-600">
              {completed}/{total}
            </h2>

          </div>

        </div>

        {/* Progress Card */}

        <div className="bg-white rounded-3xl shadow-xl p-6 mb-8">

          <div className="flex justify-between mb-3">

            <h2 className="text-xl font-bold">
              Mission Progress
            </h2>

            <span className="font-bold text-green-600">
              {progress}%
            </span>

          </div>

          <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
              style={{ width: `${progress}%` }}
            />

          </div>

        </div>

        {/* Mission Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {missions.map((mission) => (
            <div
              key={mission._id}
              className="bg-white rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            >

              <div className="p-6">

                <div className="flex justify-between items-start mb-5">

                  <div>

                    <h2 className="text-2xl font-black text-gray-800">
                      {mission.title}
                    </h2>

                    <p className="text-gray-500 mt-2">
                      {mission.description}
                    </p>

                  </div>

                  <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold">
                    +{mission.xpReward} XP
                  </div>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-sm text-gray-500">
                    Complete activity to earn reward
                  </span>

                  <button
                    onClick={() => handleMission(mission)}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-600 text-white px-5 py-3 rounded-xl font-bold transition cursor-pointer"
                  >
                    🚀 Start
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>

        {/* Bonus Reward */}

        <div className="mt-10 bg-white rounded-3xl shadow-xl p-8">

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            <div>

              <h2 className="text-3xl font-black text-gray-800">
                🏆 Daily Completion Bonus
              </h2>

              <p className="text-gray-500 mt-2">
                Complete all daily missions and unlock bonus XP.
              </p>

            </div>

            <div className="bg-green-100 text-green-700 px-6 py-4 rounded-2xl font-black text-2xl">
              +50 XP Reward
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}