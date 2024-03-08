const mongoose = require("mongoose");

const newsContentSchema = mongoose.Schema({
  _id: false,
  subTitle: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const news = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    news: {
      type: [newsContentSchema],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("News", news);
