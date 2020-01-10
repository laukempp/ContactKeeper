const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
//Tuodaan express-validator, jolla validoidaan, mitä loginin/regin yhteydessä voidaan lähettää
const { check, validationResult } = require("express-validator/check");

const User = require("../Models/User");

// @route       POST api/users
// @desc        Register a user
// @access      Public
//Validatorista1: checkit ovat checkejä ja sisällä 'name' = fieldi, mikä halutaan tsekata, 'name is required' = viesti, mikä halutaan näyttää
//Validatorista2: .not().isEmpty() tsekkaa onko fieldi tyhjä
//Validatorista3: ValidationResult laitetaan itse funktion sisään -> tsekataan onko errors-array tyhjä

router.post(
  "/",
  [
    check("name", "name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Req.body should have name, email, password
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      // If user exists we want to return a status..
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }
      // If user doesn't exist, let's take the user variable and set it to a new user. Using the User -model.
      user = new User({
        name,
        email,
        password
      });
      // bcrypt method "gensalt" which generates a salt and returns a promise so we use await
      const salt = await bcrypt.genSalt(10);
      // Then we can take the salt and hash the password. "hash" method also returns a promise so we use await. It takes in the plaintext password and the salt.
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      //We create the payload, which is the object we wanna send in the token.
      // With this user id we can access for example the contacts that the user has. And get specific data on this id.
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
