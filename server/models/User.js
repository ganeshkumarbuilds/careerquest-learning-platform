const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // Basic Info
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    // Career Selection
    career: {
      type: String,
      default: "Full Stack Dev",
    },

    // Gamification
    xp: {
      type: Number,
      default: 0,
    },

    level: {
      type: Number,
      default: 1,
    },

    streak: {
      type: Number,
      default: 0,
    },

    lastActiveDate: {
      type: Date,
      default: Date.now,
    },

    badges: {
      type: [String],
      default: [],
    },

    // Progress Tracking
    completedTasks: {
      type: [String],
      default: [],
    },

    quizzesPassed: {
      type: [String],
      default: [],
    },
    certificates: [
  {
    career: String,
    issuedAt: Date,
  },
],

    completedLectures: {
      type: [String],
      default: [],
    },

    roadmapProgress: {
      type: Number,
      default: 0,
    },

    // Placement Prep
    resumeScore: {
      type: Number,
      default: 0,
    },

    dsaSolved: {
      type: Number,
      default: 0,
    },

    aptitudeScore: {
      type: Number,
      default: 0,
    },

    interviewScore: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);