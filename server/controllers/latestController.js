const Videos = require("../models/videos");
const News = require("../models/news");
const { generatePresignedUrl } = require("../services/awsBucketServices");

const latestNewsVideos = async (req, res, next) => {
  try {
    let videos = await Videos.find().sort({ createdAt: -1 }).limit(4);
    if (videos.length) {
      videos = await generatePresignedUrl(videos);
    }
    const news = await News.find().sort({ createdAt: -1 }).limit(4);
    res.status(200).json({ news, videos });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  latestNewsVideos,
};
