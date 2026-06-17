import { useEffect, useState } from "react";
import API from "../configs/axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Certificate() {
  const [user, setUser] = useState(null);
  const [eligible, setEligible] = useState(false);

  useEffect(() => {
    fetchCertificate();
  }, []);

  const fetchCertificate = async () => {
    try {
      const { data } = await API.get(
        "/certificate/check"
      );

      setUser(data.user);
      setEligible(data.eligible);
    } catch (err) {
      console.error(err);
    }
  };

  const downloadPDF = async () => {
    const certificate =
      document.getElementById(
        "certificate"
      );

    const canvas =
      await html2canvas(certificate);

    const imgData =
      canvas.toDataURL("image/png");

    const pdf = new jsPDF(
      "landscape"
    );

    pdf.addImage(
      imgData,
      "PNG",
      10,
      10,
      270,
      180
    );

    pdf.save("certificate.pdf");
  };

  if (!user) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  if (!eligible) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-3xl font-bold">
          🔒 Certificate Locked
        </h1>

        <p className="mt-4">
          Complete your course to unlock.
        </p>
      </div>
    );
  }

  return (
    <div className="p-10">

      <div
        id="certificate"
        className="bg-white border-8 border-yellow-500 rounded-3xl p-12 text-center"
      >
        <h1 className="text-5xl font-bold mb-8">
          🎓 Certificate of Completion
        </h1>

        <p className="text-xl">
          This certifies that
        </p>

        <h2 className="text-4xl font-bold my-6">
          {user.name}
        </h2>

        <p className="text-xl">
          has successfully completed
        </p>

        <h2 className="text-3xl font-bold my-6">
          {user.career}
        </h2>

        <p>
          Issued on:
          {" "}
          {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={downloadPDF}
          className="bg-green-600 text-white px-6 py-3 rounded-xl"
        >
          Download Certificate
        </button>
      </div>

    </div>
  );
}