const { login, register, current } = require("../controllers/users");
const { auth } = require("../middleware/auth");

var express = require("express");
var router = express.Router();

router.post("/login", login);

router.post("/register", register);

router.post("/current", auth, current);

module.exports = router;
