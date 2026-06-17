const mongoose = require("mongoose");
require("dotenv").config();

const DailyMission = require("./models/DailyMission.js");

async function seedMissions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    await DailyMission.deleteMany({});

    await DailyMission.insertMany([
      {
        title: "Watch a Lecture",
        description: "Complete one daily lecture",
        xpReward: 20,
        missionType: "lecture",
      },
      {
        title: "Pass a Quiz",
        description: "Pass any quiz today",
        xpReward: 50,
        missionType: "quiz",
      },
      {
        title: "Take Mock Interview",
        description: "Complete one AI interview",
        xpReward: 30,
        missionType: "interview",
      },
      {
        title: "Resume Review",
        description: "Analyze your resume",
        xpReward: 25,
        missionType: "resume",
      },
      {
        title: "Apply Internship",
        description: "Apply for one internship",
        xpReward: 50,
        missionType: "internship",
      },
      {
        title: "Explore Jobs",
        description: "View job recommendations",
        xpReward: 15,
        missionType: "job",
      },
      {
        title: "Earn 100 XP",
        description: "Gain 100 XP in a day",
        xpReward: 75,
        missionType: "xp",
      },
      {
        title: "Maintain Streak",
        description: "Keep your streak active",
        xpReward: 40,
        missionType: "streak",
      },
      {
        title: "Complete Roadmap Topic",
        description: "Finish one roadmap topic",
        xpReward: 30,
        missionType: "roadmap",
      },
      {
        title: "Career Advisor Chat",
        description: "Ask AI Career Advisor",
        xpReward: 20,
        missionType: "advisor",
      },
    ]);

    console.log("✅ Daily Missions Seeded");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedMissions();