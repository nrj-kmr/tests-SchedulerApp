import { Router } from "express";
import { User } from '../models/user.model.js';

const usersApi = Router();

export default usersApi;

usersApi.get("/getUsers", async (req, res) => {
   const users = await User.find({})
   if (!users) return res.send(404).json({ error: "users not fetched" })
   res.json(users)
})