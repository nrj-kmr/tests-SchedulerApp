import Department from "../models/department.model.js";
import Test from "../models/tests.model.js";
import User from "../models/user.model.js";
import Admin from "../models/admin.model.js";
import bcrypt from "bcrypt";

// CREATE A NEW USER
export const createUser = async (req, res) => {
  const { firstname, lastname, email, password, department, isAdmin, role } = req.body;
  if (!firstname || !email || !password || !department) {
    return res.status(400).json({ error: 'Few fields are required!' });
  }
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists!' });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ firstname, lastname, email, password: hashedPassword, department, isAdmin, role });
      await newUser.save();
      if (isAdmin === 'true') {
        const newAdmin = new Admin({ firstname, lastname, email, password: hashedPassword, department, isAdmin, role });
        await newAdmin.save();
      }
      return res.status(201).json({ message: 'User created successfully!', isAdmin: newUser.isAdmin, newUser });
    }
  } catch (error) {
    console.error('User creation failed:', error);
    return res.status(500).json({ error: error.message, message: 'user creation failed, Internal server error!' });
  }
}

// CREATE A NEW DEPARTMENT
export const createDepartment = async (req, res) => {
  const { name, description, admin } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Department name is required' });
  }
  try {
    const newDepartment = new Department({ name, description, admin });
    await newDepartment.save();
    res.status(201).json({ message: `Department: ${newDepartment.name} created successfully!` });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Department creation failed!' });
  }
};

// CREATE A NEW TEST
export const createTest = async (req, res) => {
  try {
    const newTest = await Test.create(req.body);
    await newTest.save();
    return res.status(201).json({
      message: 'Test created successfully!',
      test: newTest
    });
  } catch (error) {
    return res.status(400).json({ error: error.message || 'Test creation failed!' });
  }
};