import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv"
import router from "./routes/user.js"
import usersApi from "./routes/allUsersApi.js";

dotenv.config({ path: "./.env" })
const app = express();

app.use(cookieParser());
app.use(express.json({limit: '16kb'}))
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

app.use(cors({
   origin: process.env.CORS_ORIGIN,
   credentials: true
}))

app.use("/user", router)
app.use("/api", usersApi)

export default app;