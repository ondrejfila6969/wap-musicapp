var express = require('express');
var router = express.Router();
const userControllers = require("../../controllers/user/user");

router.get('/', userControllers.getAllUsers);
router.get('/:id', userControllers.getUserById);
router.post('/', userControllers.createUser);
router.put('/:id', userControllers.updateUser);
router.delete('/:id', userControllers.deleteUser);

module.exports = router;
