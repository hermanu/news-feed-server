const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedModel = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    source: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feed", feedModel);

// title, body, image, source y publisher.
