const mongoose = require("mongoose");
//Tuodaan config mukaan
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParse: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log("MondoDb Connected...");
  } catch (err) {
    console.error(er.message);
    process.exit(1);
  }
};

// Sama asia kuin ylempänä mutta promiseja käyttäen
// const connectDB = () => {
//   mongoose
//     .connect(db, {
//       useNewUrlParser: true,
//       useCreateindex: true,
//       useFindAndModify: false
//     })
//     .then(() => console.log("MongoDB Connected"))
//     .catch(err => {
//       console.error(err.message);
//       process.exit(1);
//     });
// };

module.exports = connectDB;
