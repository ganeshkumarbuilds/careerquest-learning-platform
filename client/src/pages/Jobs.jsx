import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../configs/axios";

export default function Jobs() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data } = await API.get("/jobs");
      setJobs(data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        Loading Jobs...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-700">

      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gray-100 px-4 py-2 cursor-pointer rounded-xl"
          >
            ← Back
          </button>

          <h1 className="text-3xl font-black">
            💼 Job Recommendations
          </h1>

        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">

        {jobs.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center">
            No jobs available for your career.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">

            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-3xl p-6 shadow-lg"
              >
                <h2 className="text-2xl font-bold mb-2">
                  {job.title}
                </h2>

                <p className="text-gray-700 mb-2">
                  🏢 {job.company}
                </p>

                <p className="text-gray-700 mb-2">
                  📍 {job.location}
                </p>

                <p className="text-green-600 font-bold mb-4">
                  💰 {job.salary}
                </p>

                <a
                  href={job.applyLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-bold"
                >
                  Apply Now
                </a>
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}