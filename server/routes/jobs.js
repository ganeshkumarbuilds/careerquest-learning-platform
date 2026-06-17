const express = require("express");
const router = express.Router();

const Job = require("../models/Job");
const auth = require("../middleware/auth");

// Get jobs based on user career
router.get("/", auth, async (req, res) => {
  try {
    const User = require("../models/User");

    const user = await User.findById(req.user.id);

    const jobs = await Job.find({
      career: user.career,
    });

    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      msg: "Server Error",
    });
  }
});

// Add Job (for testing)
router.post("/", async (req, res) => {
  try {
    const job = await Job.create(req.body);

    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      msg: "Failed to create job",
    });
  }
});

module.exports = router;