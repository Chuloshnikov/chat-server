import jwt from "jsonwebtoken";
import { JWT_KEY } from "../config/env.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) return response.status(401).send("You are not authenticated!");
    jwt.verify(token, JWT_KEY, async(err, payload) => {
        if (err) return response.status(403).send("Token is not valid!");
        req.userId = payload.userId;
        next();
    })
}