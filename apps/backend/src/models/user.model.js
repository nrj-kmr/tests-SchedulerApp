import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   firstname: {
      type: String,
      required: true
   },
   lastname: {
      type: String,
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
   }
}, { timestamps: true })

const User = mongoose.model("User", userSchema);

export default User;