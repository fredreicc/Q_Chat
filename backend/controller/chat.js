const messages = require("../models/message");
const users = require("../models/user");

function encryption(stored_bits, pk, pk_t, A) {
  let prime = 1523;
  const n = stored_bits.length;
  const encrypted_text = [];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < 4; j++) {
      const temp = [];
      for (let k = 0; k < 5; k++) {
        const x = 1 + Math.floor(Math.random() * 190);
        temp.push(x);
      }
      const v = [];
      let sum = 0;
      for (let ii = 0; ii < 128; ii++) {
        for (let jj = 0; jj < temp.length; jj++) {
          sum += A[temp[jj]] | pk[ii];
        }
        v.push(sum);
        sum = 0;
      }
      for (let jj = 0; jj < temp.length; jj++) {
        sum += pk_t[temp[jj]];
      }
      sum = sum % prime;
      if (stored_bits[i] === 1) v.push(((sum % prime) + prime / 2) % prime);
      else v.push(sum % prime);

      encrypted_text.push(v);
    }
  }

  return encrypted_text;
}

const message = async (req, res, next) => {
  try {
    const recipent = req.params.name || "";
    let { content } = req.body;
    const user_name = req.user.name;

    var currentdate = new Date();
    var datetime =
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      " @ " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();

    const msg = await messages.findOne({ name: user_name, recipent: recipent });
    const public_key_recipient = await users.findOne({ name: recipent });
    const arr = JSON.parse(public_key_recipient.public_key);
    // console.log(pk);
    let pk = arr.pk;
    let pk_t = arr.pk_t;
    let A = arr.A;
    // console.log(L);
    // console.log(pk_t);
    // console.log(A);

    let s = content;

    let vec = [];
    for (let index = 0; index < s.length; index++) {
      let stored_bits = [];
      let c = s.charAt(index);
      let x = c.charCodeAt(0);
      let start_bit = -1;
      let bits = new Array(64).fill(0);
      let xx = x;
      let ii = 63;
      while (xx > 0) {
        if (xx & 1) bits[ii] = 1;
        xx = xx >> 1;
        ii--;
      }
      bits.reverse();
      for (let i = bits.length - 1; i >= 0; i--) {
        if (bits[i] !== 0) {
          start_bit = i;
          break;
        }
      }

      for (let i = start_bit; i >= 0; i--) {
        stored_bits.push(bits[i]);
      }

      // Reverse the order of stored_bits array (if needed)
      stored_bits.reverse();
      let xxx = encryption(stored_bits, pk, pk_t, A);
      vec.push(xxx);

      // Reverse the order of stored_bits array (if needed)
      // stored_bits.reverse();

      // console.log(stored_bits);
    }

    // console.log(cipher_text.length);
    // console.log(cipher_text);
    // console.log(vec)
    content = JSON.stringify(vec);

    if (!msg) {
      const msgs = await messages.create({ name: user_name, recipent: recipent, contents: { val: content, time: datetime } });
      msgs.save();
    } else {
      msg.contents.push({ val: content, time: datetime });
      // console.log(msg.contents)
      msg.save();
    }
    return res.send("message send successfull");
  } catch (error) {
    next(error);
  }
};
const getmessages = async (req, res, next) => {
  try {
    const recipent = req.params.name || "";

    const user_name = req.user.name;

    // console.log(user_name)
    // console.log(recipent)
    const user = await messages.findOne({ name: user_name, recipent: recipent });
    const recipet = await messages.findOne({ name: recipent, recipent: user_name });
    // const User=await users.findOne({name:recipent});
    var arr = [];
    if (!!user && user.contents.length > 0) {
      user.contents.map((item, idx) => {
        arr.push([item.time, JSON.parse(item.val)]);
      });
    }
    if (!!recipet && recipet.contents.length > 0) {
      recipet.contents.map((item, idx) => {
        arr.push([item.time, JSON.parse(item.val)]);
      });
    }

    // const public_key=JSON.parse(User.public_key)

    arr.sort();
    // arr.map((ix,id)=>{
    //     console.log(ix[1].length)
    // })

    return res.json({ messages: arr });
  } catch (err) {
    next(err);
  }
};

module.exports = { message, getmessages };
