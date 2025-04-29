const User = require("../../models/user/user");

exports.getAllUsers = async (req, res, next) => {
    try {
        const data = await User.find();
        if(data && data.length !== 0) {
            return res.status(200).send({
                message: "Users found",
                payload: data
            })
        }
        res.status(404).send({
            message: "Users not found"
        })
    } catch(e) {
        res.status(500).send(e);
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        const data = await User.findById(req.params.id);
        if(data) {
            return res.status(200).send({
                message: "User found",
                payload: data
            })
        }
        res.status(404).send({
            message: "User not found"
        })
    } catch(e) {
        res.status(500).send(e);
    }
};

exports.createUser = async (req, res, next) => {
    try {
        const data = new User({
            username: req.body.usernmae
        })
        const result = await data.save();
        if(result) {
            return res.status(201).send({
                message: "User created",
                payload: result
            })
        }
        res.status(404).send({
            message: "User not created"
        })
    } catch(e) {
        res.status(500).send(e);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const data = {
            username: req.body.username
        }
        const result = await User.findByIdAndUpdate(req.params.id, data);
        if(result) {
            return res.status(200).send({
                message: "User updated",
                payload: result
            })
        }
        res.status(404).send({
            message: "User not updated"
        })
    } catch(e) {
        res.status(500).send(e);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const result = await User.findByIdAndDelete(req.params.id);
        if(result) {
            return res.status(200).send({
                message: "User deleted",
                payload: result
            })
        }
        res.status(404).send({
            message: "User not deleted"
        })
    } catch(e) {
        res.status(500).send(e);
    }
};