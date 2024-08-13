import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv"
import Api from "./routes/api.js";

dotenv.config({ path: "./.env" })
const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json({limit: '16kb'}))
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

app.use(cors({
   origin: process.env.CORS_ORIGIN,
   methods: ["GET", "HEAD","PATCH", "POST", "PUT", "DELETE"],
   credentials: true
}))

app.use("/", Api)

export default app;