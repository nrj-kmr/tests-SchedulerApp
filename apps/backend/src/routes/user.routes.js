import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Admin from "../models/admin.model.js";
import dotenv from "dotenv";
import { createUser } from "../controllers/user.controller.js";

dotenv.config({ path: "./.env" });

const userRouter = Router();

userRouter.get("/getUsers", async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) return res.send(404).json({ error: "users not fetched" })
    return res.json(users)
  } catch (error) {
    return res.status(500).json({ error: error.message || 'internal server error!' })
  }
});

// User singup route
userRouter.post("/signup", createUser);

// User login route
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password, isAdmin, department } = req.body;
    const requiredFields = { email, password, department };

    for (const [field, value] of Object.entries(requiredFields)) {
      if (!value) {
        return res.status(400).json({ error: `${field.charAt(0).toUpperCase() + field.slice(1)} is required!` });
      }
    }

    // Check if the user is an admin
    let user;
    if (isAdmin) {
      user = await Admin.findOne({ email }).select('+superAdmin');
      if (!user) return res.status(404).json({ error: 'Admin not found!' });
    } else {
      user = await User.findOne({ email })
      if (!user) {
        return res.status(404).json({ error: 'User not found!' });
      }
    }

    // Check if the user belongs to the selected department
    if (user.department !== department) {
      return res.status(400).json({ error: 'User does not belong to the selected department!' });
    }

    // Check if the password is correct
    const passwordMatch = await (bcrypt.compare(password, user.password));
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Invalid credentials!' });
    }
    // Generate token for storing user session
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
    return res.json({ token });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: 'Sever Error, login failed!'
    });
  }
})

// Verify user credentials
userRouter.post("/verifyCredentials", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ valid: false });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    return res.json({ valid: isPasswordValid });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Error verifying credentials!' });
  }
})

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