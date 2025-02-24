import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { PORT } from "./config/env";

dotenv.config();

const app = express;
const port = PORT || 8081;