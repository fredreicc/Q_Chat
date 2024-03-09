const express = require("express");
const router = express.Router();
const cook = require("../controller/cook");
const verifyIsLoggedIn = require("../middleware/verifyjwt");

router.use(verifyIsLoggedIn);
router.get("/", cook);

module.exports = router;
