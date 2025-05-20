var express = require('express');
var router = express.Router();
const verifyToken = require("../../middleware/auth");

router.get('/', verifyToken, (req, res, next) => {});
router.get('/:id', (req, res, next) => {});
router.post('/', (req, res, next) => {});
router.put('/:id', (req, res, next) => {});
router.delete('/:id', (req, res, next) => {});

module.exports = router;