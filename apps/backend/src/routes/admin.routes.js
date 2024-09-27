import bcrypt from 'bcrypt';
import { Router } from "express";
import User from '../models/user.model.js';
import Admin from '../models/admin.model.js';
import Department from '../models/department.model.js';
import Test from '../models/tests.model.js';
import { createDepartment, createTest, createUser } from '../controllers/admin.controller.js';
import { getUsers } from '../controllers/auth.controller.js';
import Notification from '../models/notification.model.js';
import { authMiddleware } from '../middlewares/auth.js';

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
      await User.findByIdAndDelete(req.params._id);
      return res.json({ message: `${user._id} Deleted Successfully` });
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

      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      user.firstname = req.body.firstname;
      user.lastname = req.body.lastname;
      user.email = req.body.email;
      user.department = req.body.department;
      user.password = hashedPassword;
      user.isAdmin = req.body.isAdmin;
      await user.save();

      // also save/update the user into admin if the isAdmin is true
      // also if the isAdmin is false, remove from the Admin Collection
      if (req.body.isAdmin) {
         let admin = await Admin.findById(req.params._id);
         if (!admin) {
            admin = new Admin({ _id: req.params._id });
         }
         admin.firstname = req.body.firstname;
         admin.lastname = req.body.lastname;
         admin.email = req.body.email;
         admin.password = hashedPassword;
         admin.department = req.body.department;
         admin.isAdmin = req.body.isAdmin;
      
         await admin.save();
      } else {
         await Admin.findByIdAndDelete(req.params._id);
      }

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
      department.description = req.body.description;
      department.admin = req.body.admin;
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
      test.description = req.body.description;
      test.department = req.body.department;
      test.date = req.body.date;
      test.startTime = req.body.startTime;
      test.endTime = req.body.endTime;
      test.status = req.body.status;

      // also update/create a notification for the test
      const notification = {
         title: `${test.title} updated`,
         message: `The test: "${test.title}" has been updated in the '${test.department}' department.`,
         type: 'info',
         department: test.department
      };
      const notify = await Notification.create(notification);
      await notify.save();
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

      // update in notification when a test is deleted
      const notification = {
         title: `${test.title} deleted`,
         message: `The test: "${test.title}" has been deleted in the '${test.department}' department.`,
         type: 'info',
         department: test.department
      };
      const notify = await Notification.create(notification);

      await Test.findByIdAndDelete(req.params._id);
      await notify.save();
      return res.json({ message: `${test._id} Deleted Successfully` });
   } catch (error) {
      return res.status(500).json({ error: error.message || 'Test deletion failed!' });
   }
});

export default adminRouter;