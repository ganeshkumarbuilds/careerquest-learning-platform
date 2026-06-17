require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/xp", require("./routes/xp"));
app.use("/api/quiz", require("./routes/quiz"));
app.use("/api/ai", require("./routes/ai"));
app.use("/api/roadmaps", require("./routes/roadmap"));
app.use("/api/jobs", require("./routes/jobs"));
app.use("/api/internships",require("./routes/internships"));
app.use("/api/missions",require("./routes/missions"));
app.use("/api/certificate", require("./routes/certificate"));


app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CareerQuest API Running 🚀",
  });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(process.env.PORT || 5000, () => {
      console.log(
        `🚀 Server running on port ${process.env.PORT || 5000}`
      );
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:");
    console.error(err);
  });