const mongoose = require("mongoose");

const metaDataSchema = mongoose.Schema({
  _id: false,
  encoding: {
    type: String,
    required: true,
  },
  mimetype: {
    type: String,
  },
  size: {
    type: Number,
  },
});

const videos = mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    key: {
      type: String,
      required: true,
    },
    metaData: metaDataSchema,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Videos", videos);
