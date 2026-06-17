const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

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

router.get("/dashboard", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.post("/complete", auth, async (req, res) => {
  try {
    const { topic, xp } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!user.completedTasks.includes(topic)) {
      user.completedTasks.push(topic);

      user.xp += xp;

      user.level = calculateLevel(user.xp);

      const today = new Date();
      const last = new Date(user.lastActiveDate);

      const diffDays = Math.floor(
        (today - last) / (1000 * 60 * 60 * 24)
      );

      if (diffDays === 1) {
        user.streak += 1;
      } else if (diffDays > 1) {
        user.streak = 1;
      }

      user.lastActiveDate = today;

      unlockBadges(user);

      await user.save();
    }

    res.json({
      success: true,
      xp: user.xp,
      level: user.level,
      streak: user.streak,
      badges: user.badges,
      completedTasks: user.completedTasks,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.post("/complete-task", auth, async (req, res) => {
  try {
    const { taskKey } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.completedTasks.includes(taskKey)) {
      return res.status(400).json({
        message: "Task already completed",
      });
    }

    user.completedTasks.push(taskKey);

    user.xp += 80;

    user.level = calculateLevel(user.xp);

    unlockBadges(user);

    await user.save();

    res.json({
      success: true,
      xp: user.xp,
      level: user.level,
      badges: user.badges,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
});
router.post("/reward", auth, async (req, res) => {
  try {
    const { xp } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.xp += xp;

    user.level = calculateLevel(user.xp);

    unlockBadges(user);

    await user.save();

    res.json({
      success: true,
      xp: user.xp,
      level: user.level,
      badges: user.badges,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.post("/apply-internship", auth, async (req, res) => {
  try {
    const { internshipId } = req.body;

    const user = await User.findById(req.user.id);

    const taskKey = `internship-${internshipId}`;

    if (user.completedTasks.includes(taskKey)) {
      return res.status(400).json({
        message: "Already rewarded",
      });
    }

    user.completedTasks.push(taskKey);

    user.xp += 50;

    user.level = calculateLevel(user.xp);

    unlockBadges(user);

    await user.save();

    res.json({
      success: true,
      xp: user.xp,
      level: user.level,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;