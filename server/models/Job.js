const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  career: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    default: "Remote",
  },
  applyLink: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    default: "Not Disclosed",
  },
});

module.exports = mongoose.model("Job", jobSchema);