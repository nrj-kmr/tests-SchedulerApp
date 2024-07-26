import express from 'express';
import bcrypt from 'bcrypt';
import { Router } from 'express';
import User from '../models/user.model.js';

const signup = Router();

signup.post("/", async (req, res) => {
   const body = req.body;
   if (
     !body ||
     !body.firstName ||
     !body.lastName ||
     !body.email ||
     !body.password
   ) {
     return res.status(400).json(
       {
         mssg: "All Fields are required!",
         missingInfo: `${req.body}`
       }
     )
   }
   const newUser = await User.create({
     firstName: body.firstName,
     lastName: body.lastName,
     email: body.email,
     password: body.password
   })

})
// // Signup route
// signup.post('/signup', async (req, res) => {
//    const { name, email, password } = req.body;

//    try {
//       // Check if the user already exists
//       const existingAdmin = await User.findOne({ email });
//       if (existingUser) {
//          return res.status(400).json({ message: 'User already exists' });
//       }

//       // Hash the password
//       const hashedPassword = await bcrypt.hash(password, 10);

//       // Create a new user
//       const newUser = new User({
//          name,
//          email,
//          password: hashedPassword
//       });

//       // Save the admin to the database
//       await newUser.save();

//       res.status(201).json({ message: 'User created successfully' });
//    } catch (error) {
//       res.status(500).json({ message: 'Server error', error });
//    }
// });

export default signup;