var express = require('express');
var router = express.Router();
const searchController = require('../../controllers/search/search');

router.get("/mainSearch/:term", searchController.MainSearch);

module.exports = router;
