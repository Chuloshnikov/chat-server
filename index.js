import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ORIGIN, PORT } from "./config/env.js";
import connectToDatabase from "./database/mongodb.js";
import authRouter from "./routes/AuthRoutes.js";
import errorMiddleware from './middlewares/ErrorMiddleware.js';
import contactsRouter from "./routes/ContactRoutes.js";
import setupSocket from "./socket.js";
import messagesRoutes from "./routes/MessagesRoutes.js";


const app = express();
const port = PORT || 8081;


app.use(
    cors({
      origin: ORIGIN, 
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
      allowedHeaders: ['Content-Type', 'Authorization'], 
      credentials: true, 
    })
  );

app.use("/uploads/profiles", express.static("uploads/profiles"));
app.use("uploads/files", express.static("uploads/files"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



//routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/contacts", contactsRouter);
app.use("/api/v1/messages", messagesRoutes);

app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send('Welcome to Obscura chat api!');
});

const server = app.listen(port, async () => {
    console.log(`Server running on http://localhost:${port}`);

    await connectToDatabase();
});

setupSocket(server);

export default app;