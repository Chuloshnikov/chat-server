import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ORIGIN, PORT } from "./config/env.js";
import connectToDatabase from "./database/mongodb.js";
import authRouter from "./routes/AuthRoutes.js";


const app = express();
const port = PORT || 8081;


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



//routes
app.use("api/v1/auth", authRouter);



app.listen(port, async () => {
    console.log(`Server running on http://localhost:${port}`);

    await connectToDatabase();
});