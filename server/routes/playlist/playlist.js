var express = require('express');
var router = express.Router();
const playlistControllers = require("../../controllers/playlist/playlist");

router.get('/', playlistControllers.getAllPlaylists);
router.get('/:id', playlistControllers.getPlaylistById);
router.post('/', playlistControllers.createPlaylist);
router.put('/:id', playlistControllers.updatePlaylist);
router.delete('/:id', playlistControllers.deletePlaylist);

module.exports = router;