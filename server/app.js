const express = require("express");
const index = require("./routes/index");
const path = require("path");

const app = express();
app.use("/api/", index);

if (process.env.SERVE_FE) {
  app.use(express.static(path.join(__dirname + "/../client", "build")));
  +app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname + "/../client", "build", "index.html"));
  });
} else {
  app.use("/", index);
}

module.exports = app;
