const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
process.env["NODE_CONFIG_DIR"] = __dirname + "/config/";
const config = require("config");
const router = require("./routes");
const ErrorHandler = require("./middleware/ErrorHandler");

const app = express();
const PORT = config.get("serverPort") || 7000;

app.use(helmet());
app.use(cors("*"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined", { immediate: true }));

app.use("/", router);

// connect to DB
const { user, password, host, port, name } = config.get("db");
const url = `mongodb://${user}:${password}@${host}:${port}/${name}?authSource=admin`;
mongoose
  .connect(url)
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });

app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
