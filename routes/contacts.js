const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator/check");

const User = require("../Models/User");
const Contact = require("../Models/Contact");

// @route       GET api/contacts
// @desc        Get all users contacts
// @access      Private
//Try & catch because we're dealing with Mongoose
router.get("/", auth, (req, res) => {
  try {
      //Contact -model has a "user" -field, which has objectID. Since we're using the auth -middleware we have access to the req.user object. -1 in sort makes the most recent contacts appear first.
      const contacts = await Contact.find({user: req.user.id}).sort({date: -1});
      res.json(contacts);

      
  } catch (err) {
console.error(err.message)
res.status(500).send('Server error')      
  }
});

// @route       POST api/contacts
// @desc        Add new contact
// @access      Private
router.post("/", (req, res) => {
  res.send("Add a contact");
});

// @route       PUT api/contacts/:id || id on placeholder sille kontaktille, mitä halutaan muokata
// @desc        Update contact
// @access      Private
router.put("/:id", (req, res) => {
  res.send("Update contact");
});

// @route       PUT api/contacts/:id
// @desc        Update contact
// @access      Private
router.delete("/:id", (req, res) => {
  res.send("Delete contact");
});

module.exports = router;
