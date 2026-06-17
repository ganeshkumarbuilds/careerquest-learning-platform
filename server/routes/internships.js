const express = require("express");
const router = express.Router();

const Internship = require("../models/Internship");
const User = require("../models/User");
const auth = require("../middleware/auth");

// Get internships based on user's career
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const internships = await Internship.find({
      career: user.career,
    });

    res.json(internships);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      msg: "Server Error",
    });
  }
});

// Add internship (testing)
router.post("/", async (req, res) => {
  try {
    const internship = await Internship.create(
      req.body
    );

    res.json(internship);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      msg: "Failed to create internship",
    });
  }
});

module.exports = router;