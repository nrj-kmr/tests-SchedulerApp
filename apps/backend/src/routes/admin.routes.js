import bcrypt from 'bcrypt';
import { Router } from "express";
import User from '../models/user.model.js';
import Admin from '../models/admin.model.js';
import Department from '../models/department.model.js';
import Test from '../models/tests.model.js';
import { createDepartment, createTest, createUser } from '../controllers/admin.controller.js';
import { checkAuthorization, getUsers } from '../controllers/auth.controller.js';

const adminRouter = Router();

// Admin Routes for user management
adminRouter.post("/createUser", createUser)
adminRouter.get("/getUsers", getUsers)

// get user by email
adminRouter.get("/getUser/:email", async (req, res) => {
   try {
      const user = await User.findOne({ email: req.params.email });
      if (!user) return res.status(404).json({ error: "User not found" });
      return res.json(user);
   } catch (error) {
      return res.status(500).json({ error: error.message || 'User not found!' });
   }
});

adminRouter.delete("/deleteUser/:_id", async (req, res) => {
   try {
      const user = await User.findById(req.params._id);
      if (!user) return res.status(404).json({ error: "User not found" });
      if (user.isAdmin) {
         return res.status(403).json({ error: "You are not authorized to delete this user" })
      } else {
         await User.findByIdAndDelete(req.params._id);
         return res.json({ message: `${user._id} Deleted Successfully` });
      }
   } catch (error) {
      return res.status(500).json({ error: error.message || 'User deletion failed!' });
   }
});

adminRouter.put("/resetPassword/:_id", async (req, res) => {
   try {
      const user = await User.findByIdAndUpdate(req.params._id);
      if (!user) return res.status(404).json({ error: "User not found" });
      user.password = await bcrypt.hash(req.bodypassword, 10);
      await user.save();
      return res.json({ message: 'Password reset successfully!' });
   } catch (error) {
      return res.status(500).json({ error: error.message || 'Password reset failed!' });
   }
})

adminRouter.put("/editUser/:_id", async (req, res) => {
   try {
      const user = await User.findByIdAndUpdate(req.params._id);
      if (!user) return res.status(404).json({ error: "User not found" });
      user.firstname = req.body.firstname;
      user.lastname = req.body.lastname;
      user.email = req.body.email;
      user.department = req.body.department;
      user.role = req.body.role;
      await user.save();
      return res.json({
         message: 'User updated successfully!',
         user
      });
   } catch (error) {
      return res.status(500).json({ error: error.message || 'User update failed!' });
   }
})

// Admin Routes for department management
adminRouter.post("/createDepartment", createDepartment);

adminRouter.get("/getDepartments", async (req, res) => {
   try {
      const departments = await Department.find({});
      if (!departments) return res.send(404).json({ error: "Departments not fetched" })
      return res.json(departments)
   } catch (error) {
      return res.status(500).json({
         error: error.message,
         message: 'server error, with departments'
      })
   }
})

// get department for an email
adminRouter.get("/getDepartment/:email", async (req, res) => {
   try {
      const user = await User.findOne({ email: req.params.email });
      if (!user) return res.status(404).json({ error: "User not found" });
      return res.json({ department: user.department });
   } catch (error) {
      return res.status(500).json({ error: error.message || 'Department not found!' });
   }
})

adminRouter.put("/editDepartment/:_id", async (req, res) => {
   try {
      const department = await Department.findByIdAndUpdate(req.params._id);
      if (!department) return res.status(404).json({ error: "Department not found" });
      department.name = req.body.name;
      await department.save();
      res.json({
         message: 'Department updated successfully!',
         department
      });
   } catch (error) {
      return res.status(500).json({ error: error.message || 'Department update failed!' });
   }
});

adminRouter.delete("/deleteDepartment/:_id", async (req, res) => {
   try {
      const department = await Department.findById(req.params._id);
      if (!department) return res.status(404).json({ error: "department not found" });
      await Department.findByIdAndDelete(req.params._id);
      return res.json({ message: `${department._id} Deleted Successfully` });
   } catch (error) {
      return res.status(500).json({ error: error.message || 'Department deletion failed!' });
   }
});

// Admin Routes for test management
adminRouter.post("/createTest", createTest);

adminRouter.get("/getTests", async (req, res) => {
   try {
      const tests = await Test.find({});
      if (!tests) return res.send(404).json({ error: "Tests not fetched" })
      return res.json(tests)
   } catch (error) {
      return res.status(500).json({
         error: error.message,
         message: 'Error while fetching tests'
      })
   }
})

adminRouter.put("/editTest/:_id", async (req, res) => {
   try {
      const test = await Test.findByIdAndUpdate(req.params._id);
      if (!test) return res.status(404).json({ error: "Test not found" });
      test.title = req.body.title;
      test.department = req.body.department;
      await test.save();
      res.json({
         message: 'Test updated successfully!',
         test
      });
   } catch (error) {
      return res.status(500).json({ error: error.message || 'Test update failed!' });
   }
});


adminRouter.delete("/deleteTest/:_id", async (req, res) => {
   try {
      const test = await Test.findById(req.params._id);
      if (!test) return res.status(404).json({ error: "Test not found" });
      await Test.findByIdAndDelete(req.params._id);
      return res.json({ message: `${test._id} Deleted Successfully` });
   } catch (error) {
      return res.status(500).json({ error: error.message || 'Test deletion failed!' });
   }
});

// Protected route to create superAdmin
adminRouter.post("/createSuperAdmin", checkAuthorization, async (req, res) => {
   try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
         return res.status(400).json({ error: 'Name, Email and Password are required!' });
      }
      const hashedPassword = await bcrypt.hash(password, 10)
      const newSuperAdmin = new Admin({ name, email, password: hashedPassword, superAdmin: true });
      await newSuperAdmin.save()
      res.status(201).json({ message: "SuperAdmin created Successfully!" })
   } catch (error) {
      return res.status(500).json({
         error: error.message,
         message: "error while creating superAdmin"
      })
   }
})

adminRouter.get("/getSuperAdmins", checkAuthorization, async (req, res) => {
   try {
      const superAdmins = await Admin.find({ superAdmin: true });
      if (!superAdmins) return res.send(404).json({ error: "SuperAdmins not fetched" })
      return res.json(superAdmins)
   } catch (error) {
      return res.status(500).json({
         error: error.message,
         message: 'Error while fetching SuperAdmins'
      })
   }
})

export default adminRouter;