import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../configs/axios";

export default function Lectures() {
  const navigate = useNavigate();

  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchLectures = async () => {
    try {
      const { data: user } = await API.get("/xp/dashboard");

      const res = await API.get(
        `/roadmaps/${encodeURIComponent(user.career)}`
      );

      setRoadmap(res.data.roadmap);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchLectures();
}, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-bold">
        Loading lectures...
      </div>
    );
  }

  if (!roadmap || !roadmap.topics) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-bold">
        No roadmap found for this career.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">

      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl cursor-pointer"
          >
            ← Back
          </button>

          <h1 className="text-3xl font-black">
            📺 Daily Lectures
          </h1>

        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">
            {roadmap.career}
          </h2>

          <p className="text-blue-100">
            Watch lectures and earn XP
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {roadmap.topics.map((topic, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg p-6"
            >

              <div className="text-4xl mb-4">
                🎓
              </div>

              <h3 className="text-xl font-bold mb-3">
                {topic.title}
              </h3>

              <p className="text-gray-600 mb-5">
                {topic.description}
              </p>

              <div className="flex flex-col gap-3">

                <a
                  href={topic.lectureUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 hover:bg-red-700 text-white text-center py-3 rounded-xl font-bold"
                >
                  ▶ Watch Lecture
                </a>

                <button
                  onClick={async () => {
                    try {
                      await API.post(
                        "/xp/complete",
                        {
                          topic: `Lecture-${topic.title}`,
                          xp: 10,
                        }
                      );

                      alert(
                        `🎉 ${topic.title} completed! +10 XP`
                      );
                    } catch (err) {
                      console.error(err);
                      alert(
                        "Failed to update XP"
                      );
                    }
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold cursor-pointer"
                >
                  ✅ Mark as Watched
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    </div>
  );
}