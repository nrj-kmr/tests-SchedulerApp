import Department from "../models/department.model.js";
import Test from "../models/tests.model.js";
import User from "../models/user.model.js";

export const createDepartment = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Department name is required' });
  }

  try {
    const newDepartment = new Department({ name });
    await newDepartment.save();
    res.status(201).json({ message: 'Department created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const createTest = async (req, res) => {
  const { title, date, departmentId } = req.body;

  if (!title || !date || !departmentId) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newTest = new Test({ title, date, department: departmentId });
    await newTest.save();
    res.status(201).json({ message: 'Test created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};