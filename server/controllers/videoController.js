const uuid = require("uuid").v4;
const {
  uploadObjectToBucket,
  generatePresignedUrl,
  deleteObject,
} = require("../services/awsBucketServices");
const Videos = require("../models/videos");

const postVideo = async (req, res, next) => {
  const { originalname, encoding, buffer, mimetype, size } = req.file;
  try {
    const key = `${uuid()}_${originalname}`;
    await uploadObjectToBucket(key, buffer, mimetype);
    const videoObj = {
      fileName: originalname,
      key: key,
      metaData: {
        encoding,
        mimetype,
        size,
      },
    };
    const video = new Videos(videoObj);
    await video.save();
    return res.status(200).json({ message: "Video uploaded sucessfully" });
  } catch (err) {
    next(err);
  }
};

const getVideos = async (req, res, next) => {
  try {
    const { limit, page } = req.query;
    const count = await Videos.find({}).count();
    let videos = await Videos.find()
      .skip(limit * (page - 1))
      .limit(limit);
    if (videos.length) {
      videos = await generatePresignedUrl(videos);
    }
    return res.status(200).json({ count, videos });
  } catch (err) {
    next(err);
  }
};

const deleteVideo = async (req, res, next) => {
  try {
    const { id } = req.query;
    const video = await Videos.findByIdAndDelete(id);
    if (!video) {
      throw new Error("Video Id doesn't exists!");
    }
    await deleteObject(video.key);
    return res.status(200).json({ message: "Deleted sucessfully" });
  } catch (err) {
    next(err);
  }
};

const latestVideos = async (req, res, next) => {
  try {
    let latest = await Videos.find().sort({ createdAt: -1 }).limit(4);
    if (latest.length) {
      latest = await generatePresignedUrl(videos);
    }
    return res.status(200).json(latest);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  postVideo,
  getVideos,
  deleteVideo,
  latestVideos,
};
