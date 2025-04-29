const Song = require("../../models/song/song");

exports.getAllSongs = async (req, res, next) => {
    try {
        const data = await Song.find();
        if(data && data.length !== 0) {
            return res.status(200).send({
                message: "Songs found",
                payload: data
            })
        }
        res.status(404).send({
            message: "Songs not found"
        })
    } catch(e) {
        res.status(500).send(e);
    }
};

exports.getSongById = async (req, res, next) => {
    try {
        const data = await Song.findById(req.params.id);
        if(data) {
            return res.status(200).send({
                message: "Song found",
                payload: data
            })
        }
        res.status(404).send({
            message: "Song not found"
        })
    } catch(e) {
        res.status(500).send(e);
    }
};

exports.createSong = async (req, res, next) => {
    try {
        const data = new Song({

        })
        const result = await data.save();
        if(result) {
            return res.status(201).send({
                message: "Song created",
                payload: result
            })
        }
        res.status(404).send({
            message: "Song not created"
        })
    } catch(e) {
        res.status(500).send(e);
    }
};

exports.updateSong = async (req, res, next) => {
    try {
        const data = {

        }
        const result = await Song.findByIdAndUpdate(req.params.id, data);
        if(result) {
            return res.status(200).send({
                message: "Song updated",
                payload: result
            })
        }
        res.status(404).send({
            message: "Song not updated"
        })
    } catch(e) {
        res.status(500).send(e);
    }
};

exports.deleteSong = async (req, res, next) => {
    try {
        const result = await Song.findByIdAndDelete(req.params.id);
        if(result) {
            return res.status(200).send({
                message: "Song deleted",
                payload: result
            })
        }
        res.status(404).send({
            message: "Song not deleted"
        })
    } catch(e) {
        res.status(500).send(e);
    }
};