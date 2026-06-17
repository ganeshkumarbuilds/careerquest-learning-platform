const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const User = require("../models/User");

router.get("/check", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const eligible =
      user.level >= 7 &&
      user.quizzesPassed.length >= 7 &&
      user.completedLectures.length >= 5 &&
      user.interviewScore > 0;

    res.json({
      eligible,
      user,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      msg: "Server Error",
    });
  }
});

module.exports = router;