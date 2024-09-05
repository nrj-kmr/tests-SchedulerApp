import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import { defaultAdmin } from "./defaultAdmin.js";
import Admin from "../models/admin.model.js";
import User from "../models/user.model.js";
import Department from "../models/department.model.js";
import bcrypt from "bcrypt";

const seedDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`mongodb://127.0.0.1:27017/${DB_NAME}`);
    console.log(`> Connected to database ✅ \n> DB HOST: ${connectionInstance.connection.host}\n> DB Name: ${connectionInstance.connection.name}\n`);

    // Check if the default admin user exists
    const adminUser = await Admin.findOne({ email: defaultAdmin.email });
    const user = await User.findOne({ email: defaultAdmin.email });
    const department = await Department.findOne({ name: defaultAdmin.department });

    if (!adminUser && !user && !department) {
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(defaultAdmin.password, 10);

      // Create new Admin
      const newAdmin = new Admin({
        ...defaultAdmin,
        password: hashedPassword,
      });

      // Create new User
      const newUser = new User({
        ...defaultAdmin,
        password: hashedPassword,
      });

      // Create new Department
      const newDepartment = new Department({
        name: defaultAdmin.department,
        description: 'Default department',
        admin: defaultAdmin.email,
      });

      // Save the new Admin, User, and Department
      await newAdmin.save();
      await newUser.save();
      await newDepartment.save();

      console.log(`> Default admin & department created successfully.\n Admin email: ${defaultAdmin.email}\n Password: ${defaultAdmin.password}\n Department: ${defaultAdmin.department}\n`);
    } else {
      // delete existing and create new
      await Admin.deleteMany({ email: defaultAdmin.email });
      await User.deleteMany({ email: defaultAdmin.email });
      await Department.deleteMany({ name: defaultAdmin.department });

      // create new after deleting existing
      const hashedPassword = await bcrypt.hash(defaultAdmin.password, 10);
      const newAdmin = new Admin({
        ...defaultAdmin,
        password: hashedPassword,
      });
      const newUser = new User({
        ...defaultAdmin,
        password: hashedPassword,
      });
      const newDepartment = new Department({
        name: defaultAdmin.department,
        description: 'Default department',
        admin: defaultAdmin.email,
      });

      await newAdmin.save();
      await newUser.save();
      await newDepartment.save();

      console.log(`> Admin user or department already exists.\n Created Successfully \n Admin email: ${defaultAdmin.email}\n Password: ${defaultAdmin.password}\n Department: ${defaultAdmin.department}\n`);
    }

    mongoose.connection.close();
  } catch (error) {
    console.error('Database Seeding Failed:', error);
    process.exit(1);
  }
};

seedDB();