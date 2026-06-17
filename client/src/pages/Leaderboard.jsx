import { useEffect, useState } from "react";
import API from "../configs/axios";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await API.get("/auth/leaderboard");
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to load leaderboard", err);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 to-orange-400 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-6 text-center">
          🏆 Leaderboard
        </h1>

        {users.length === 0 ? (
          <p className="text-center text-gray-500">
            No leaderboard data available.
          </p>
        ) : (
          <div className="space-y-4 ">
            {users.map((user, index) => (
              <div
                key={user._id}
                className="flex justify-between items-center border rounded-xl p-4"
              >
                <div>
                  <h2 className="font-bold  text-lg">
                    #{index + 1} {user.name}
                  </h2>
                  <p className="text-gray-500">
                    {user.career}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-yellow-600">
                    ⚡ {user.xp} XP
                  </p>
                  <p>Level {user.level}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}