import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      unique: true
   },
   admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true
   }
}, { timestamps: true })

const Department = mongoose.model("Department", departmentSchema);

export default Department;