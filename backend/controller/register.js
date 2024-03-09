const user = require("../models/user");
const genAuthToken = require("../utils/userAuthToken");
const { LocalStorage } = require("node-localstorage");
const localStorage = new LocalStorage("./scratch");
const public_key = require("../public_key/public_key_generator");

const register = async (req, res, next) => {
  try {
    const { email, name, password, public_key } = req.body;
    if (!email || !name || !password) {
      return res.status(400).send("please enter all fields");
    }
    const users = await user.findOne({ email: email });

    const public_user_key = JSON.stringify(public_key);
    if (!users) {
      const users = await user.create({ name: name, email: email, password: password, public_key: public_user_key });

      users.save();

      let arr = [2];
      var xx = Math.floor(Math.random() * 10);
      // let ar=arr[(Math.floor(Math.random() * arr.length))];

      // localStorage.setItem('key', 'value');
      return res
        .cookie("access_token", genAuthToken(users.id, users.name, users.email), {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        })
        .json({ data: [email, name, password] });
    } else {
      res.send("User already exist");
    }
  } catch (err) {
    next(err);
  }
};

module.exports = register;
