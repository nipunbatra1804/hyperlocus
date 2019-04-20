const cors = require("cors");
const whitelist = ["http://localhost:3000", "http://www.hyperloc.us"];

const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      //callback(new Error("Not allowed by CORS"));
      callback(null, true);
    }
  },
  credentials: true
};
//,credentials: true

module.exports = cors(corsOptions);
