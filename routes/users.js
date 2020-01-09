const express = require("express");
const router = express.Router();
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
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }

      user = new User({
        name,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
    } catch (err) {}
  }
);

module.exports = router;
