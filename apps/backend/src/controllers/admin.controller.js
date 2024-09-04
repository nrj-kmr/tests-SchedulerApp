import Department from "../models/department.model.js";
import Test from "../models/tests.model.js";
import User from "../models/user.model.js";
import Admin from "../models/admin.model.js";
import bcrypt from "bcrypt";
import Notification from "../models/notification.model.js";

// CREATE A NEW USER
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
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ firstname, lastname, email, password: hashedPassword, department, isAdmin });
      await newUser.save();
      if (isAdmin === 'true') {
        const newAdmin = new Admin({ firstname, lastname, email, password: hashedPassword, department, isAdmin });
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
    const notification = {
      title: `${newTest.title} created`,
      message: `A new test: "${newTest.title}" has been created`,
      type: 'info',
      department: newTest.department
    };
    const notify = await Notification.create(notification);
    await notify.save();

    // logic to delete old notifications if the total number of notifications exceeds 100
    const notificationCount = await Notification.countDocuments();
    if (notificationCount > 100) {
      const oldestNotifications = await Notification.find().sort({ createdAt: 1 }).limit(notificationCount - 100);
      const oldestNotificationIds = oldestNotifications.map(notification => notification._id);
      await Notification.deleteMany({ _id: { $in: oldestNotificationIds } });
    }

    await newTest.save();
    return res.status(201).json({
      message: 'Test created successfully!',
      test: newTest
    });
  } catch (error) {
    return res.status(400).json({ error: error.message || 'Test creation failed!' });
  }
};