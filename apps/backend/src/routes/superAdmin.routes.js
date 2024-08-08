import { Router } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import Admin from '../models/admin.model.js';
import Department from '../models/department.model.js';
import { createUser } from '../controllers/admin.controller.js';

const superAdminRouter = Router();

// SuperAdmin Routes for admin management
superAdminRouter.post("/createAdmin", createUser)

superAdminRouter.get("/getAdmins", async (req, res) => {
   try {
      const admins = await Admin.find({});
      if (!admins) return res.send(404).json({ error: "Admins not fetched" })
      return res.json(admins)
   } catch (error) {
      return res.status(500).json({
         error: error.message,
         message: 'Error while fetching Admins' })
   }
})

superAdminRouter.delete("/deleteAdmin/:_id", async (req, res) => {
   try {
      const admin = await Admin.findByIdAndDelete(req.params._id);
      if (!admin) return res.status(404).json({ error: "Admin not found" });
      return res.json({ message: `${admin._id} Deleted Successfully` });
   } catch (error) {
      return res.status(500).json({ error: error.message || 'Admin deletion failed!' });
   }
});

superAdminRouter.put("/resetAdminPassword/:_id", async (req, res) => {
   try {
      const admin = await Admin.findByIdAndUpdate(req.params._id);
      if (!admin) return res.status(404).json({ error: "Admin not found" });
      admin.password = req.body.password;
      await admin.save();
      return res.json({ message: 'Password reset successfully!' });
   } catch (error) {
      return res.status(500).json({ error: error.message || 'Password reset failed!' });
   }
})

// SuperAdmin Routes for department management
superAdminRouter.post("/createDepartment", async (req, res) => {
   try {
      const newDepartment = await Department.create(req.body);
      await newDepartment.save();
      return res.status(201).json({ message: `Department: ${newDepartment.name} created successfully!` });
   } catch (error) {
      return res.status(500).json({ error: error.message || 'Department creation failed!' });
   }
});

superAdminRouter.get("/getDepartments", async (req, res) => {
   try {
      const departments = await Department.find({});
      if (!departments) return res.send(404).json({ error: "Departments not fetched" })
      return res.json(departments)
   } catch (error) {
      return res.status(500).json({
         error: error.message,
         message: 'server error, with departments' })
   }
})

superAdminRouter.put("/editDepartment/:_id", async (req, res) => {
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

export default superAdminRouter;