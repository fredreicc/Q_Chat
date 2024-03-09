const mongose = require("mongoose");

const messageSchema = mongose.Schema({
  name: {
    type: String,
    require: true,
  },
  recipent: {
    type: String,
    require: true,
  },
  contents: [{ val: { type: String }, time: { type: String } }],
});

const message = mongose.model("Message", messageSchema);
module.exports = message;
