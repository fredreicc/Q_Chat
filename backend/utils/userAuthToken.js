const jwt = require("jsonwebtoken");
const genAuthToken = (_id, name, email) => {
  return jwt.sign({ _id, name, email }, process.env.JWT_SEC_KEY, { expiresIn: "7h" });
};

module.exports = genAuthToken;
