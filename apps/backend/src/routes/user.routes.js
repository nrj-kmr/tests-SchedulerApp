import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Admin from "../models/admin.model.js";
import dotenv from "dotenv";

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
userRouter.post("/signup", async (req, res) => {
  try {
    const { firstname, lastname, email, password, department } = req.body;
    if (!firstname || !lastname || !email || !password || !department) {
      return res.status(400).json({ error: 'All fields are required!' });
    }
    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ error: 'User already exists!' });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ firstname, lastname, email, password: hashedPassword, department });
      await newUser.save();
      return res.status(201).json({ message: 'User created successfully!' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message, message: 'user creation failed!' });
  }
})

// User login route
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password, isAdmin } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'All fields are required!' });
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
      message: 'login failed!'
    });
  }
})

export default userRouter;