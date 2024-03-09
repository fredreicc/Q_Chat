const express = require("express");
const router = express.Router();
const { message, getmessages } = require("../controller/chat");
const verifyIsLoggedIn = require("../middleware/verifyjwt");

router.use(verifyIsLoggedIn);
router.post("/:name", message);
router.get("/:name", getmessages);

module.exports = router;
