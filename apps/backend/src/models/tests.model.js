import mongoose from "mongoose";

const testsSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true
   },
   description: {
      type: String,
   },
   date: {
      type: Date,
      required: true
   },
   startTime: {
      type: Date,
      required: true
   },
   endTime: {
      type: Date,
      required: true
   },
   department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true
   },
   createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true
   },
   status: {
      type: String,
      required: true
   },
}, { timestamps: true })

const Tests = mongoose.model("Tests", testsSchema);
export default Tests;