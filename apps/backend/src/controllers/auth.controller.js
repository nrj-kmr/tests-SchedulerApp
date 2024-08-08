import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Admin from "../models/admin.model.js";

import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

// Middleware to check if the user is authorized
export const checkAuthorization = async (req, res, next) => {
   const authHeader = req.headers.authorization;
   if (authHeader && authHeader === process.env.SUPERADMIN_SECRET) {
      next();
   } else {
      res.status(403).json({ error: 'Forbidden!' });
   }
}

// Get All Users
export const getUsers = async (req, res) => {
   try {
      const users = await User.find({});
      if (!users) return res.send(404).json({ error: "users not fetched" })
      res.json(users);
   } catch (error) {
      return res.status(500).json({
         error: error.message,
         message: "internal server error!"
      });
   }
};

export const login = async (req, res) => {
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
};

export const verifyCredentials = async (req, res) => {
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
}