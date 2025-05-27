var express = require('express');
var router = express.Router();
const userControllers = require("../../controllers/user/user");

router.get("/", userControllers.getUser);
router.post("/login", userControllers.login);
router.post("/register", userControllers.register);
router.get("/:id", userControllers.getUserById);


module.exports = router;
