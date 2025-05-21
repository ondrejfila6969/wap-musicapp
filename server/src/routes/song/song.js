var express = require('express');
var router = express.Router();
const songControllers = require("../../controllers/song/song");

router.get('/:id', songControllers.getSongById);
router.post('/create/:userid/:albumid', songControllers.createSong);
router.put('/:id', songControllers.updateSong);
router.delete('/:id', songControllers.deleteSong);

module.exports = router;