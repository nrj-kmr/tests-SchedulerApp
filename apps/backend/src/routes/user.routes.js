import { Router } from "express";
import Admin from "../models/admin.model.js";
import dotenv from "dotenv";
import { signup } from "../controllers/user.controller.js";
import { login, verifyCredentials } from "../controllers/auth.controller.js";
import { getUsers } from "../controllers/auth.controller.js";

dotenv.config({ path: "./.env" });
const userRouter = Router();

userRouter.get("/getUsers", getUsers);

// User singup route
userRouter.post("/signup", signup);

// User login route
userRouter.post("/login", login);

// Verify user credentials
userRouter.post("/verifyCredentials", verifyCredentials)

// Verify if a user is an admin
userRouter.get("/verifyAdmin/:email", async (req, res) => {
  try {
    const user = await Admin.findOne({ email: req.params.email });
    if (!user) {
      return res.json({ isAdmin: false });
    }
    return res.json({ isAdmin: true });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Error verifying admin!' });
  }
})
export default userRouter;