import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { DATABASE_URI, ORIGIN, PORT } from "./config/env.js";
import connectToDatabase from "./database/mongodb.js";


const app = express();
app.use(
    cors({
        origin: [ORIGIN],
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());




const port = PORT || 8081;
const databaseUrl = DATABASE_URI;

app.listen(port, async () => {
    console.log(`Server running on http://localhost:${port}`);

    await connectToDatabase();
});