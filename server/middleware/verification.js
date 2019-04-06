const jwt = require("jsonwebtoken");
const { User } = require("../models");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const verification = async (req, res, next) => {
  try {
    const accessToken = req.cookies["token"];
    console.log(req.headers);
    const tokenData = await jwt.verify(accessToken, process.env.SECRET_KEY);
    if (tokenData) {
      const user = await User.findOne({
        where: { username: tokenData.username }
      });
      if (!user) {
        return res.status(400).json({
          error: { message: "User not Found, Please go to SignUP page" }
        });
      }
      req.decoded = tokenData;
      next();
    }
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

module.exports = verification;
