const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { User } = require("../models");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

router.route("/register").post(async (req, res) => {
  try {
    const user = await User.create(req.body);
    const newuser = await User.findOne({ where: { id: user.id } });
    return res.status(201).json(newuser);
  } catch (err) {
    res.status(303).json(err.message);
  }
});

const userAuthenticate = async (username, password) => {
  try {
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      throw new Error("User with username doesnt exist");
    }
    const match = user.password === password;
    if (!match) {
      throw new Error("You are not authorized");
    }
    return user;
  } catch (err) {
    throw Error(err);
  }
};

router.route("/login").post(async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userAuthenticate(username, password);
    const secret = process.env.SECRET_KEY;
    const token = await jwt.sign(
      { username: username, category: user.category },
      secret
    );
    return res
      .cookie("token", token, { httpOnly: true, secure: false })
      .status(200)
      .send({ username });
  } catch (err) {
    return res.status(303).json(err.message);
  }
});

router
  .route("/token")
  .get(async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log(username, password);
      const user = await userAuthenticate(username, password);
      if (user) {
        const secret = process.env.SECRET_KEY;
        const token = await jwt.sign(
          { username: username, category: user.category },
          secret
        );
        return res.status(200).json({
          token
        });
      }
    } catch (err) {
      res.status(400).json(err.message);
    }
  })
  .post(async (req, res) => {
    return res.status(200);
  });

module.exports = router;
