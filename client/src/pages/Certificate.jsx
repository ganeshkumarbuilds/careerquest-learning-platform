import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../configs/axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Certificate() {
  const [user, setUser] = useState(null);
  const [eligible, setEligible] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCertificate();
  }, []);

  const fetchCertificate = async () => {
    try {
      const { data } = await API.get("/certificate/check");

      setUser(data.user);
      setEligible(data.eligible);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  const downloadPDF = async () => {
    const certificate = document.getElementById("certificate");

    const canvas = await html2canvas(certificate, {
      scale: 2,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("landscape");

    pdf.addImage(
      imgData,
      "PNG",
      5,
      5,
      287,
      200
    );

    pdf.save(
      `CareerQuest-Certificate-${user?.name}.pdf`
    );
  };

  const levelTitles = {
    1: "Explorer",
    2: "Learner",
    3: "Achiever",
    4: "Expert",
    5: "Master",
    6: "Champion",
    7: "Legend",
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
        <div className="text-center text-white">
          <div className="text-7xl animate-bounce mb-4">
            🎓
          </div>

          <h2 className="text-2xl font-bold">
            Loading Certificate...
          </h2>
        </div>
      </div>
    );
  }

  if (!eligible) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-lg text-center">

          <div className="text-7xl mb-4">
            🔒
          </div>

          <h1 className="text-4xl font-black text-gray-800 mb-4">
            Certificate Locked
          </h1>

          <p className="text-gray-600 mb-6">
            Reach the required milestone to unlock your CareerQuest completion certificate.
          </p>

          <div className="bg-indigo-50 rounded-2xl p-5 mb-6">

            <p className="font-bold text-lg">
              Current Progress
            </p>

            <div className="mt-3 space-y-2 text-left">

              <p>
                ⚡ XP:
                <span className="font-bold ml-2">
                  {user?.xp}
                </span>
              </p>

              <p>
                🎯 Level:
                <span className="font-bold ml-2">
                  {user?.level}
                </span>
              </p>

              <p>
                🏅 Badges:
                <span className="font-bold ml-2">
                  {user?.badges?.length || 0}
                </span>
              </p>

            </div>
          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold cursor-pointer"
          >
            ← Back to Dashboard
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">

      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-6">

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-white px-5 py-3 rounded-xl font-bold shadow-lg cursor-pointer hover:scale-105 transition"
          >
            ← Back
          </button>

          <button
            onClick={downloadPDF}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg cursor-pointer"
          >
            ⬇ Download Certificate
          </button>

        </div>

        <div
          id="certificate"
          className="
          bg-white
          rounded-[40px]
          border-[12px]
          border-yellow-500
          shadow-2xl
          p-14
          text-center
          relative
          overflow-hidden
          "
        >

          <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400"></div>

          <div className="text-7xl mb-4">
            🏆
          </div>

          <h1 className="text-6xl font-black text-gray-800 mb-3">
            Certificate
          </h1>

          <h2 className="text-3xl font-bold text-indigo-600 mb-8">
            CareerQuest Learning Platform
          </h2>

          <p className="text-xl text-gray-600">
            This certificate is proudly presented to
          </p>

          <h2 className="text-6xl font-black text-gray-900 my-8">
            {user?.name}
          </h2>

          <p className="text-xl text-gray-600">
            for successfully completing the
          </p>

          <h3 className="text-4xl font-black text-purple-700 my-6">
            {user?.career}
          </h3>

          <div className="grid md:grid-cols-3 gap-6 my-10">

            <div className="bg-yellow-50 rounded-2xl p-5">
              <p className="text-sm text-gray-500">
                Total XP
              </p>

              <h3 className="text-3xl font-black">
                ⚡ {user?.xp}
              </h3>
            </div>

            <div className="bg-blue-50 rounded-2xl p-5">
              <p className="text-sm text-gray-500">
                Current Level
              </p>

              <h3 className="text-3xl font-black">
                🎯 {user?.level}
              </h3>
            </div>

            <div className="bg-green-50 rounded-2xl p-5">
              <p className="text-sm text-gray-500">
                Rank
              </p>

              <h3 className="text-3xl font-black">
                🏅 {levelTitles[user?.level]}
              </h3>
            </div>

          </div>

          <div className="flex justify-between items-center mt-12">

            <div className="text-left">
              <p className="text-gray-500">
                Issue Date
              </p>

              <h4 className="font-bold text-xl">
                {new Date().toLocaleDateString()}
              </h4>
            </div>

            <div>
              <div className="text-6xl">
                🎓
              </div>

              <p className="font-bold text-gray-700">
                CareerQuest Academy
              </p>
            </div>

            <div className="text-right">
              <p className="text-gray-500">
                Certificate ID
              </p>

              <h4 className="font-bold">
                CQ-{user?._id?.slice(-6)}
              </h4>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}