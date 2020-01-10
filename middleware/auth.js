// Everytime we hit an endpoint we can fire off middleware
// Add this middleware to all routes that need to be protected

const jwt = require("jsonwebtoken");
const config = "config";

// Whenever you have a middleware function, after you do what you want to do you need to call the "next" function, which just says move on to the next piece of middleware
module.exports = function(req, res, next) {
  // Get token from header (x-auth-token is basically the key to the token)
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  // If there is a token we're gonna verify it and pull out the payload -> set the user in that payload to req.user so that we'll have access to it inside that route.
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
