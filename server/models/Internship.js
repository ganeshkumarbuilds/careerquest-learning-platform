const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema(
  {
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

    stipend: {
      type: String,
      default: "Not Disclosed",
    },

    duration: {
      type: String,
      default: "3 Months",
    },

    applyLink: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Internship",
  internshipSchema
);