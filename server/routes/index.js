const express = require("express");
const {
  postNews,
  getNews,
  deleteNews,
  latestNews,
} = require("../controllers/NewsController");

const UploadHandler = require("../middleware/UploadHandler");
const {
  postVideo,
  getVideos,
  deleteVideo,
  latestVideos,
} = require("../controllers/videoController");
const { latestNewsVideos } = require("../controllers/latestController");

const router = express.Router({ caseSensitive: true, strict: true });

//healthCheck
router.get("/healthcheck", (req, res) => {
  res.json({
    uptime: Math.floor(process.uptime()) + " seconds",
    message: "Mongo-Node",
    timestamp: Date.now(),
  });
});

//videos
router.post("/postvideo", UploadHandler.single("video"), postVideo);
router.get("/getvideos", getVideos);
router.delete("/deletevideo", deleteVideo);
router.get("/latestvideos", latestVideos);

//news
router.post("/postnews", postNews);
router.get("/getnews", getNews);
router.delete("/deletenews", deleteNews);
router.get("/latestnews", latestNews);

//latest
router.get("/latest", latestNewsVideos);

module.exports = router;
