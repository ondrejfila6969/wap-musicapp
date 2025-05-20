const UserAuthSchema = require("../../models/userAuth/userAuth");
const UserSchema = require("../../models/user/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            return res.status(400).send({ msg: "Email and password are required !" });
        }

        const userAuth = await UserAuthSchema.findOne({ email });

        if (userAuth && (await bcrypt.compare(password, userAuth.password))) {
            const token = jwt.sign(
                { user_id: userAuth._id, email: userAuth.email },
                process.env.TOKEN_KEY,
                { expiresIn: "2h" }
            );

            userAuth.token = token;
            await userAuth.save();

            const user = await UserSchema.findById(userAuth.referencesUser);

            return res.status(200).json({
                _id: userAuth._id,
                email: userAuth.email,
                referencesUser: userAuth.referencesUser,
                userName: user.userName,
                pfpSrc: user.pfpSrc,
                token,
            });
        }

        return res.status(400).send({ msg: "Wrong email or password" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
};

exports.register = async (req, res) => {
    try {
        const { userName, email, password, referencesUser } = req.body;

        if (!(userName && email && password && referencesUser)) {
            return res.status(400).send({ msg: "All fields are required !" });
        }

        const existingUserAuth = await UserAuthSchema.findOne({ email });
        if (existingUserAuth) {
            return res.status(409).send({ msg: "User with this email exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userAuth = await UserAuthSchema.create({
            referencesUser,
            email: email.toLowerCase(),
            password: hashedPassword,
        });

        const user = await UserSchema.create({
            userName,
            pfpSrc: "http://localhost:3000/defaultImages/default_Pfp.png",
        });

        userAuth.referencesUser = user._id;
        await userAuth.save();

        const token = jwt.sign(
            { user_id: userAuth._id, email: userAuth.email },
            process.env.TOKEN_KEY,
            { expiresIn: "2h" }
        );

        userAuth.token = token;
        await userAuth.save();

        return res.status(201).json({
            _id: userAuth._id,
            email: userAuth.email,
            referencesUser: userAuth.referencesUser,
            userName,
            pfpSrc: user.pfpSrc,
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
};