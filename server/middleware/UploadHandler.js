const multer = require("multer");
const storage = multer.memoryStorage();

const UploadHandler = multer({
  storage: storage,
  limits: {
    fileSize: 4 * 1024 * 1024 * 1024, //Max file size 4GB
    files: 1,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("video/")) {
      cb(null, true);
    } else {
      cb(new Error("File must be a video type"), false);
    }
  },
});

module.exports = UploadHandler;
