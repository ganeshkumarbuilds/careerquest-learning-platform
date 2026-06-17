const mongoose = require("mongoose");

const dailyMissionSchema = new mongoose.Schema({
  title: String,
  description: String,
  xpReward: Number,
  missionType: String,
});

module.exports = mongoose.model(
  "DailyMission",
  dailyMissionSchema
);