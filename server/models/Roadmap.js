const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  xpReward: {
    type: Number,
    default: 20,
  },
  lectureUrl: {
    type: String,
    default: "",
  },
});

const roadmapSchema = new mongoose.Schema(
  {
    career: {
      type: String,
      required: true,
      unique: true,
    },
    topics: [topicSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Roadmap", roadmapSchema);