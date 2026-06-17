const express = require("express");
const router = express.Router();

const DailyMission = require("../models/DailyMission");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const missions = await DailyMission.find();

    res.json(missions);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      msg: "Server Error",
    });
  }
});

module.exports = router;