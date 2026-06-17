const express = require("express");
const router = express.Router();
const Roadmap = require("../models/Roadmap");

router.get("/:career", async (req, res) => {
  try {
    const career = decodeURIComponent(req.params.career);

    console.log("Career Requested:", career);

    const roadmap = await Roadmap.findOne({
      career: career,
    });

    console.log("Roadmap Found:", roadmap);

    if (!roadmap) {
      return res.status(404).json({
        msg: "Roadmap not found",
      });
    }

    res.json({
      roadmap,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      msg: "Server Error",
    });
  }
});

module.exports = router;