import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { DATABASE_URI, PORT } from "./config/env.js";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const port = PORT || 8081;
const databaseUrl = DATABASE_URI;

const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
});