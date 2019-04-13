const express = require("express");
const index = require("./routes/index");
const towns = require("./routes/towns");
const cors = require("./middleware/cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
app.use(cors);
app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(express.json());
app.use("/", index);

module.exports = app;
