var express = require('express');
var router = express.Router();
const userControllers = require("../../controllers/user/user");
const pfpContoller = require("../../controllers/user/pfp");
const auth = require("../../middlewares/auth");

router.get("/", auth, userControllers.getUser);
router.post("/login", userControllers.login);
router.post("/register", userControllers.register);
router.get("/:id", userControllers.getUserById);
router.put("/:id/pfp", pfpContoller.uploadProfilePicture);
router.put("/:id", userControllers.updateUsername);
router.delete("/:id", userControllers.deleteUser);


module.exports = router;