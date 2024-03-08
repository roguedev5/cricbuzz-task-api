const config = require("config");

const mode = config.get("mode") || "development";

const ErrorHandler = (err, req, res, next) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong!";
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: mode === "development" ? err.stack : {},
  });
};

module.exports = ErrorHandler;
