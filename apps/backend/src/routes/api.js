import { Router } from "express";
import { User } from '../models/user.model.js';

const Api = Router();

export default Api;

Api.get("/getUsers", async (req, res) => {
   const users = await User.find({})
   if (!users) return res.send(404).json({ error: "users not fetched" })
   res.json(users)
})