import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
   firstname: { type: String, required: true },
   lastname: { type: String },
   email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
         validator: function (v) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
         },
         message: props => `${props.value} is not a valid email address!`
      }
   },
   password: { type: String, required: true },
   department: { type: String, ref: "Department" },
   isAdmin: { type: Boolean, default: false },
   superAdmin: { type: Boolean, default: false, select: false }
}, { timestamps: true })

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;