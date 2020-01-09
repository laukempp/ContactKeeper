const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect database
connectDB();

// Init Middleware
app.use(express.json({ extended: false })); //Tarvitaan, jotta hyväksytään "body-muotoista" dataa (express genillä tehdessä tulee suoraan)

app.get("/", (req, res) =>
  res.json({ msg: "Welcome to the ContactKeeper API" })
);

// Define Routes (everytime the the url is hit -> the route is triggered)
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
