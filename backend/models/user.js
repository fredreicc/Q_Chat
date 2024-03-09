const mongose = require("mongoose");

const userSchema = mongose.Schema({
  name: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  public_key: {
    type: String,
  },
});

const user = mongose.model("User", userSchema);
module.exports = user;
