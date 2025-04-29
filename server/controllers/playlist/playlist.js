const Playlist = require("../../models/playlist/playlist");

exports.getAllPlaylists = async (req, res, next) => {
    try {
        const data = await Playlist.find();
        if(data && data.length !== 0) {
            return res.status(200).send({
                message: "Playlists found",
                payload: data
            })
        }
        res.status(404).send({
            message: "Playlists not found"
        })
    } catch(e) {
        res.status(500).send(e);
    }
};

exports.getPlaylistById = async (req, res, next) => {
    try {
        const data = await Playlist.findById(req.params.id);
        if(data) {
            return res.status(200).send({
                message: "Playlist found",
                payload: data
            })
        }
        res.status(404).send({
            message: "Playlist not found"
        })
    } catch(e) {
        res.status(500).send(e);
    }
};

exports.createPlaylist = async (req, res, next) => {
    try {
        const data = new Playlist({
            name: req.body.name
        })
        const result = await data.save();
        if(result) {
            return res.status(201).send({
                message: "Playlist created",
                payload: result
            })
        }
        res.status(404).send({
            message: "Playlist not created"
        })
    } catch(e) {
        res.status(500).send(e);
    }
};

exports.updatePlaylist = async (req, res, next) => {
    try {
        const data = {
            name: req.body.name
        }
        const result = await Playlist.findByIdAndUpdate(req.params.id, data);
        if(result) {
            return res.status(200).send({
                message: "Playlist updated",
                payload: result
            })
        }
        res.status(404).send({
            message: "Playlist not updated"
        })
    } catch(e) {
        res.status(500).send(e);
    }
};

exports.deletePlaylist = async (req, res, next) => {
    try {
        const result = await Playlist.findByIdAndDelete(req.params.id);
        if(result) {
            return res.status(200).send({
                message: "Playlist deleted",
                payload: result
            })
        }
        res.status(404).send({
            message: "Playlist not deleted"
        })
    } catch(e) {
        res.status(500).send(e);
    }
};