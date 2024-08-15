const { login, register, current } = require("../controllers/users");
const { auth } = require("../middleware/auth");

var express = require("express");
var router = express.Router();

router.post("/login", login);

router.post("/register", register);

router.get("/current", auth, current);

module.exports = router;
