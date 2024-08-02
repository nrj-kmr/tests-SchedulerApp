import User from "../models/user.model.js";
import Admin from "../models/admin.model.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "users not fetched"   
   });
  }
};

export const createUser = async (req, res) => {
  const { firstname, lastname, email, password, department, isAdmin } = req.body;
  if (!firstname || !email || !password || !department) {
    return res.status(400).json({ error: 'Few fields are required!' });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists!' });
    } else {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({ firstname, lastname, email, password: hashedPassword, department, isAdmin });
      await newUser.save();

      // If user is an admin, add them to the admin collection
      if (isAdmin === 'true') {
        const newAdmin = new Admin({ firstname, lastname, email, password: hashedPassword, department, isAdmin });
        await newAdmin.save();
      }

      return res.status(201).json({ message: 'User created successfully!', isAdmin: newUser.isAdmin });
    }
  } catch (error) {
    console.error('User creation failed:', error);
    return res.status(500).json({ error: error.message, message: 'user creation failed, Internal server error!' });
  }
}