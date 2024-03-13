const express = require("express");
const chatroute = require("./chatroute");
const register = require("./registerroute");
const cookroute = require("./cook");

const router = express.Router();

router.use("/chat", chatroute);
router.use("/register", register);
router.use("/getcook", cookroute);

module.exports = router;
