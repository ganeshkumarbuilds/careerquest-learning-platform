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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Missions...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 to-pink-500 p-8">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-white px-4 py-2 rounded-xl font-bold"
          >
            ← Back
          </button>

          <h1 className="text-4xl font-bold text-white">
            🎯 Daily Missions
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {missions.map((mission) => (
            <div
              key={mission._id}
              className="bg-white rounded-3xl p-6 shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-2">
                {mission.title}
              </h2>

              <p className="text-gray-600 mb-4">
                {mission.description}
              </p>

              <div className="flex justify-between items-center">
                <span className="font-bold text-green-600">
                  +{mission.xpReward} XP
                </span>

                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-xl"
                  onClick={() =>
                    alert(
                      "Complete this activity in the app to earn XP."
                    )
                  }
                >
                  View Mission
                </button>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}