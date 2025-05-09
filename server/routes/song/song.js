var express = require('express');
var router = express.Router();
const songControllers = require("../../controllers/song/song");

router.get('/', songControllers.getAllSongs);
router.get('/:id', songControllers.getSongById);
router.post('/', songControllers.createSong);
router.put('/:id', songControllers.updateSong);
router.delete('/:id', songControllers.deleteSong);

module.exports = router;