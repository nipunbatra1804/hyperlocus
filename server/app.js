const express = require("express");
const index = require("./routes/index");
const path = require("path");

const app = express();
app.use("/api", index);
// app.use(express.static(path.join(__dirname + "/../client", "build")));
//app.get("/*", function(req, res) {
//  res.sendFile(path.join(__dirname + "/../client", "build", "index.html"));
//});

module.exports = app;
