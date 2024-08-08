import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      unique: true
   },
   description : {
      type: String,
   },
   admin: {
      type: String,
      ref: "Admin",
   }
}, { timestamps: true })

const Department = mongoose.model("Department", departmentSchema);

export default Department;