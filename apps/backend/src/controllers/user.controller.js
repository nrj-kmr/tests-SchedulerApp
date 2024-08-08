import User from "../models/user.model.js";
import bcrypt from "bcrypt";

// SIGNUP
export const signup = async (req, res) => {
  const { firstname, lastname, email, password, department, isAdmin, role } = req.body;
  if (!firstname || !email || !password || !department) {
     return res.status(400).json({ message: "All fields are required" });
  }

  try {
     const existingUser = await User.findOne({ email });
     if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
     }

     const hashedPassword = await bcrypt.hash(password, 10);

     const newUser = new User({ firstname, lastname, email, password: hashedPassword, department, isAdmin , role});

     await newUser.save();

     res.status(201).json({ message: "User created successfully" });
  } catch (error) {
     res.status(500).json({ message: "Server error", error });
  }
};