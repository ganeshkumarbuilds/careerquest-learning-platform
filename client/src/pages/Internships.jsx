import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../configs/axios";

export default function Internships() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const { data } = await API.get("/internships");
        setInternships(data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchInternships();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        Loading internships...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 p-8">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-white px-4 py-2 rounded-xl font-bold"
          >
            ← Back
          </button>

          <h1 className="text-4xl font-bold text-white">
            💼 Internship Recommendations
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {internships.map((internship) => (
            <div
              key={internship._id}
              className="bg-white rounded-3xl p-6 shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-2">
                {internship.title}
              </h2>

              <p className="text-gray-600 mb-2">
                🏢 {internship.company}
              </p>

              <p className="text-gray-600 mb-2">
                📍 {internship.location}
              </p>

              <p className="text-gray-600 mb-2">
                💰 {internship.stipend}
              </p>

              <p className="text-gray-600 mb-4">
                ⏳ {internship.duration}
              </p>
              <button
  onClick={async () => {
    try {
      await API.post(
        "/xp/apply-internship",
        {
          internshipId:
            internship._id,
        }
      );

      window.open(
        internship.applyLink,
        "_blank"
      );

      alert(
        "🎉 +50 XP awarded for internship application!"
      );
    } catch (err) {
      window.open(
        internship.applyLink,
        "_blank"
      );

      alert(
        "You already received XP for this internship."
      );
    }
  }}
  className="bg-green-600 text-white px-5 py-3 rounded-xl font-bold"
>
  Apply Now 🚀
</button>

              
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}