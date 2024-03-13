const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const port = 3000;
// const { LocalStorage } = require("node-localstorage");
// const localStorage = new LocalStorage("./scratch");
app.use(express.json());
const apiRoutes = require("./routes/apiroutes");

app.use(cookieParser());

app.get("/", async (req, res, next) => {
  res.json({ message: "API running..." });
});

// mongodb connection
const connectDB = require("./config/db");

connectDB();

app.use("/api", apiRoutes);

app.use((error, req, res, next) => {
  console.error(error);
  next(error);
});
app.use((error, req, res, next) => {
  res.status(500).json({
    message: error.message,
    stack: error.stack,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
