import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },
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
   password: {
      type: String,
      required: true,
   },
   department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true
   }
}, { timestamps: true })

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;