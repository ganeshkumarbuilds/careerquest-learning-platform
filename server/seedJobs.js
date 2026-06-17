const mongoose = require("mongoose");
require("dotenv").config();

const Job = require("./models/Job");

async function seedJobs() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    await Job.deleteMany({});

    await Job.insertMany([
      // Full Stack
      {
        career: "Full Stack Dev",
        title: "Frontend Developer Intern",
        company: "Google",
        location: "Remote",
        salary: "₹30,000/month",
        applyLink: "https://careers.google.com"
      },
      {
        career: "Full Stack Dev",
        title: "MERN Stack Developer",
        company: "Infosys",
        location: "Hyderabad",
        salary: "₹6 LPA",
        applyLink: "https://www.infosys.com/careers"
      },

      // Data Analyst
      {
        career: "Data Analyst",
        title: "Data Analyst Intern",
        company: "Deloitte",
        location: "Bangalore",
        salary: "₹35,000/month",
        applyLink: "https://www2.deloitte.com"
      },
      {
        career: "Data Analyst",
        title: "Business Analyst",
        company: "Accenture",
        location: "Hyderabad",
        salary: "₹7 LPA",
        applyLink: "https://www.accenture.com"
      },

      // AI/ML
      {
        career: "AI/ML Engineer",
        title: "Machine Learning Intern",
        company: "NVIDIA",
        location: "Remote",
        salary: "₹50,000/month",
        applyLink: "https://www.nvidia.com"
      },

      // Cybersecurity
      {
        career: "Cybersecurity",
        title: "Security Analyst",
        company: "TCS",
        location: "Pune",
        salary: "₹6.5 LPA",
        applyLink: "https://www.tcs.com/careers"
      },

      // DevOps
      {
        career: "DevOps Engineer",
        title: "Junior DevOps Engineer",
        company: "Wipro",
        location: "Bangalore",
        salary: "₹7 LPA",
        applyLink: "https://careers.wipro.com"
      },

      // UI/UX
      {
        career: "UI/UX Designer",
        title: "UI Designer Intern",
        company: "Adobe",
        location: "Remote",
        salary: "₹40,000/month",
        applyLink: "https://www.adobe.com/careers"
      }
    ]);

    console.log("✅ Jobs Seeded Successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedJobs();