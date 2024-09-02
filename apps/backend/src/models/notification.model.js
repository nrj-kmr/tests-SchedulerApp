import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
     title: { type: String, required: true },
     message: { type: String, required: true },
     department: { type: String, ref: 'Department' },
     isRead: { type: Boolean, default: false },
}, { timestamps: true })

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;