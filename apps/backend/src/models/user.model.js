import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
   department: { type: String, ref: 'Department' },  
   isAdmin: { type: Boolean, default: false },
}, { timestamps: true })

// Define virtual property to get fullname
userSchema.virtual('fullname').get(function () {
   return `${this.firstname} ${this.lastname}`;
});

// Define virtual property to get user role
userSchema.virtual('userRole').get(function () {
   return this.isAdmin ? 'Admin' : 'User';
});

userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

const User = mongoose.model("User", userSchema);

export default User;