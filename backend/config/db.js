const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://sameerkantptn55:n8TYD0fUK8vrZsBl@cluster0.l3n18g6.mongodb.net/Q_chat_data");
    console.log("MongoDB connection SUCCESS");
  } catch (error) {
    console.error("MongoDB connection FAIL");
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
