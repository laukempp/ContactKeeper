const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
//Tuodaan express-validator, jolla validoidaan, mitä loginin/regin yhteydessä voidaan lähettää
const { check, validationResult } = require("express-validator/check");

const User = require("../Models/User");

// @route       GET api/auth
// @desc        Get logged in user
// @access      Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// @route       POST api/auth
// @desc        Auth user & get token
// @access      Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
      //If user is found we want to continue to check the password. -> We use bcrypt's .compare() method
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      //Jos löytyy email ja passwordit mätsäävät -> sendataan token (sama kuin rekisteröinnissä)
      const payload = {
        user: {
          id: user.id
        }
      };
      //To generate a token we have to sign it
      // takes in payload and secret (secret stored for example in config)
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000
        }, // After the options -> Function with possible error and the token itself
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
