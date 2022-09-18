const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tModel = new Schema(
  {
    title: {
      type: String,
      required: [true, "Track title is required"],
    },
    isDone: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const trackModel = mongoose.model("track", tModel);

module.exports = trackModel;
