var express = require('express');
var router = express.Router();
const userControllers = require("../../controllers/user/user");
const auth = require("../../middlewares/auth");

router.get("/", auth, userControllers.getUser);
router.post("/login", userControllers.login);
router.post("/register", userControllers.register);
router.get("/:id", userControllers.getUserById);


module.exports = router;
