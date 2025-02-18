const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema({
  // Contactlistat ovat käyttäjäkohtaisia, joten täytyy referoida yksittäiseen käyttäjään -> referoidaan "users"-collectionissa oleviin käyttäjä id:siin.
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String
  },
  type: {
    type: String,
    default: "personal"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("contact", ContactSchema);
