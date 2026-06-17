const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");

function calculateLevel(xp) {
  if (xp >= 6500) return 7;
  if (xp >= 4500) return 6;
  if (xp >= 3000) return 5;
  if (xp >= 1800) return 4;
  if (xp >= 900) return 3;
  if (xp >= 400) return 2;
  return 1;
}

function unlockBadges(user) {
  const badges = [];

  if (user.xp >= 50) badges.push("🚀 Beginner");
  if (user.xp >= 200) badges.push("⚡ Learner");
  if (user.xp >= 500) badges.push("🏆 Champion");
  if (user.level >= 5) badges.push("🎯 Master");
  if (user.level >= 7) badges.push("👑 Legend");
  if (user.streak >= 7) badges.push("🔥 Dedicated");

  user.badges = [...new Set([...user.badges, ...badges])];
}

router.post("/submit", auth, async (req, res) => {
  try {
    const { quizKey, score } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    if (user.quizzesPassed.includes(quizKey)) {
      return res.status(400).json({
        msg: "Quiz already completed",
      });
    }

    if (score >= 2) {
      user.quizzesPassed.push(quizKey);

      user.xp += 150;

      user.level = calculateLevel(user.xp);

      unlockBadges(user);

      await user.save();

      return res.json({
        passed: true,
        xp: user.xp,
        level: user.level,
        badges: user.badges,
        msg: "+150 XP earned!",
      });
    }

    return res.json({
      passed: false,
      msg: "Score too low. Try again!",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      msg: "Server error",
    });
  }
});

module.exports = router;