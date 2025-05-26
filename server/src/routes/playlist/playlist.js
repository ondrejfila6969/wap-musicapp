var express = require('express');
var router = express.Router();
const playlistControllers = require("../../controllers/playlist/playlist");

router.get('/', playlistControllers.getAllPlaylists);
router.get('/:id', playlistControllers.getPlaylistById);
router.post('/createAlbum/:userId', playlistControllers.createAlbum); //create albumx pak pro kazdou songu v playlistu pushni do arraye na id alba ziskanej z frontedu
router.put('/:id', playlistControllers.updatePlaylist);
router.delete('/:id', playlistControllers.deletePlaylist);

module.exports = router;