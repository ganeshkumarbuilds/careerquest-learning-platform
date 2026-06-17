const Roadmap = require("../models/Roadmap");

// Get roadmap by career
const getRoadmap = async (req, res) => {
  try {
    const { career } = req.params;

    const roadmap = await Roadmap.findOne({ career });

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found",
      });
    }

    res.status(200).json({
      success: true,
      roadmap,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Create a new roadmap
const createRoadmap = async (req, res) => {
  try {
    const { career, topics } = req.body;

    const existing = await Roadmap.findOne({ career });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Roadmap already exists",
      });
    }

    const roadmap = await Roadmap.create({
      career,
      topics,
    });

    res.status(201).json({
      success: true,
      roadmap,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  getRoadmap,
  createRoadmap,
};