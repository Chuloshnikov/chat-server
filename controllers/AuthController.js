import pkg from 'jsonwebtoken'
import { JWT_KEY } from "../config/env.js";
import User from "../models/UserModel.js";

const maxAge = 3 * 24 * 60 * 60 * 1000;
const { sign } = pkg;

const createToken = (email, userId) => {
    return sign({ email, userId }, JWT_KEY, { expiresIn: maxAge })
};

export const signUp = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send("Email and Password is required");
        };

        const user = await User.create({ email, password});
        res.cookie("jwt", createToken(email, user.id), {
            maxAge,
            secure: true,
            sameSite: "None",
        });

        return res.status(201).json({ user: {
            id: user.id,
            email: user.email,
            profileSetup: user.profileSetup,
        }})
    } catch (error) {
        console.log({ error });
        return res.status(500).send("Internal server error");
    }
}