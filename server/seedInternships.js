const mongoose = require("mongoose");
require("dotenv").config();

const Internship = require("./models/Internship");

async function seedInternships() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    await Internship.deleteMany({});

    await Internship.insertMany([
      {
        career: "Full Stack Dev",
        title: "Frontend Developer Intern",
        company: "Google",
        location: "Remote",
        stipend: "₹30,000/month",
        duration: "6 Months",
        applyLink: "https://careers.google.com"
      },
      {
        career: "Full Stack Dev",
        title: "MERN Stack Intern",
        company: "Infosys",
        location: "Hyderabad",
        stipend: "₹20,000/month",
        duration: "3 Months",
        applyLink: "https://www.infosys.com/careers"
      },

      {
        career: "Data Analyst",
        title: "Data Analyst Intern",
        company: "Deloitte",
        location: "Bangalore",
        stipend: "₹25,000/month",
        duration: "6 Months",
        applyLink: "https://www2.deloitte.com"
      },

      {
        career: "AI/ML Engineer",
        title: "Machine Learning Intern",
        company: "NVIDIA",
        location: "Remote",
        stipend: "₹50,000/month",
        duration: "6 Months",
        applyLink: "https://www.nvidia.com"
      },

      {
        career: "Cybersecurity",
        title: "Cybersecurity Intern",
        company: "TCS",
        location: "Pune",
        stipend: "₹22,000/month",
        duration: "4 Months",
        applyLink: "https://www.tcs.com/careers"
      },

      {
        career: "DevOps Engineer",
        title: "DevOps Intern",
        company: "Wipro",
        location: "Bangalore",
        stipend: "₹25,000/month",
        duration: "6 Months",
        applyLink: "https://careers.wipro.com"
      },

      {
        career: "UI/UX Designer",
        title: "UI/UX Design Intern",
        company: "Adobe",
        location: "Remote",
        stipend: "₹35,000/month",
        duration: "6 Months",
        applyLink: "https://www.adobe.com/careers"
      }
    ]);

    console.log("✅ Internships Seeded Successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedInternships();