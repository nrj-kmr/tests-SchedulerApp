import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const signup = async (req, res) => {
   const { name, email, password, role } = req.body;

   if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
   }

   try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
         return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
         name,
         email,
         password: hashedPassword,
         role
      });

      await newUser.save();

      res.status(201).json({ message: 'User created successfully' });
   } catch (error) {
      res.status(500).json({ message: 'Server error', error });
   }
};

export const login = async (req, res) => {
   const { email, password, isAdmin } = req.body;

   if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
   }

   try {
      let user;
      if(isAdmin) {
         user = await User.findOne({ email }).select('+superAdmin');
         if (!user) {
            return res.status(400).json({ error: 'Admin not found' });
         } else {
            user = await User.findOne({ email });
            if (!user) {
               return res.status(400).json({ error: 'User not found' });
            }
         }
      }
      // check if the password is correct
      const passwordMatch = await bcrypt.compare(password, user.password)
      if (!passwordMatch) {
         return res.status(400).json({ error: 'Invalid credentials' });
      }

      // session-based authentication
      req.session.user = user;

      // token-based authentication
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
         expiresIn: '2h'
      });

      // redirect to the dashboard based on the user's role
      const response = {
         token,
         user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
         },
         message: `${user.role} logged in successfully`,
         redirectUrl: user.role === 'admin' ? '/admin/dashboard' : '/dashboard'
      }

      res.status(200).json(response);
   } catch (error) {
      res.status(500).json({ message: 'Server error', error });
   }
};