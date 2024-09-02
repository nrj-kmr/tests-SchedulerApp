import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
   firstname: { type: String, required: true, trim: true },
   lastname: { type: String, trim: true },
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
   isAdmin: { type: Boolean, default: true },
}, { timestamps: true })

// Define virtual property to get fullname
adminSchema.virtual('fullname').get(function () {
   return `${this.firstname} ${this.lastname}`;
});

// Define virtual property to get user role
adminSchema.virtual('userRole').get(function () {
   return this.isAdmin ? 'Admin' : 'User';
});

adminSchema.set('toJSON', { virtuals: true });
adminSchema.set('toObject', { virtuals: true });

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;