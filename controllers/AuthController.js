import pkg from 'jsonwebtoken'
import { JWT_KEY } from "../config/env.js";
import User from "../models/UserModel.js";
import { compare } from 'bcrypt';
import { renameSync, unlinkSync } from "fs";

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

        const user = await User.create({ email, password });
        res.cookie("jwt", createToken(email, user.id), {
            maxAge,
            secure: true,
            sameSite: "None",
        });

        return res.status(201).json({ user: {
            id: user.id,
            email: user.email,
            profileSetup: user.profileSetup,
        }});
    } catch (error) {
        console.log({ error });
        return res.status(500).send("Internal server error");
    }
};


export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send("Email and Password is required");
        };

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send("User with this email is not found");
        };

        const auth = await compare(password, user.password);
        if(!auth) {
            return res.status(400).send("Password is incorrect");
        };

        res.cookie("jwt", createToken(email, user.id), {
            maxAge,
            secure: true,
            sameSite: "None",
        });

        return res.status(200).json({ user: {
            id: user.id,
            email: user.email,
            profileSetup: user.profileSetup,
            firstName: user.firstName,
            lastName: user.lastName,
            image: user.image,
            color: user.color,
        }});
    } catch (error) {
        console.log({ error });
        return res.status(500).send("Internal server error");
    }
};

export const getUserInfo = async (req, res, next) => {
    try {
        const userData = await User.findById(req.userId);
        if (!userData) {
            return res.status(404).send("User with the given id not found.");
        }
            return res.status(200).json({
            id: userData.id,
            email: userData.email,
            profileSetup: userData.profileSetup,
            firstName: userData.firstName,
            lastName: userData.lastName,
            image: userData.image,
            color: userData.color,
            });
        
    } catch (error) {
        console.log({ error });
        return res.status(500).send("Internal server error");
    }
};


export const updateProfile = async (req, res, next) => {
    try {
        const { userId } = req;
        const { firstName, lastName, color } = req.body;
        if (!firstName || !lastName) {
            return res.status(404).send("There is no required data for this api");
        }


        const userData = await User.findByIdAndUpdate(
            userId, {
            firstName, lastName, color, profileSetup: true
            }, 
            {new: true, runValidators: true}
        );
            return res.status(200).json({
            id: userData.id,
            email: userData.email,
            profileSetup: userData.profileSetup,
            firstName: userData.firstName,
            lastName: userData.lastName,
            image: userData.image,
            color: userData.color,
            });
        
    } catch (error) {
        console.log({ error });
        return res.status(500).send("Internal server error");
    }
};


export const addProfileImage = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).send("File is required.");
        }

        const date = Date.now();
        let fileName = "uploads/profiles" + date + req.file.originalname;
        renameSync(req.file.path, fileName);

        const updatedUser = await User.findByIdAndUpdate(req.userId, { image: fileName }, { new: true , runValidators: true});

            return res.status(200).json({        
            image: updatedUser.image,
            });
        
    } catch (error) {
        console.log({ error });
        return res.status(500).send("Internal server error");
    }
};


export const removeProfileImage = async (req, res, next) => {
    try {
        const { userId } = req;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send("User not found.");
        }

        if (user.image) {
            unlinkSync(user.image);
        }

        user.image = null;
        await user.save();

        return res.status(200).send("Profile image removed successfully.");
        
    } catch (error) {
        console.log({ error });
        return res.status(500).send("Internal server error");
    }
};


export const logout = async (req, res, next) => {
    try {
      res.cookie("jwt", "", { maxAge: 1, secure: true, sameSite: "None" });
      return res.status(200).send("Logout successfully.");
    } catch (error) {
        console.log({ error });
        return res.status(500).send("Internal server error");
    }
};
