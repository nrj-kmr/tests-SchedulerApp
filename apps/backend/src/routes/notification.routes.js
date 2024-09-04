import { Router } from 'express';
import Notification from '../models/notification.model.js';

const notificationRouter = Router();

notificationRouter.get('/getNotifications', async (req, res) => {
  try {
    const notifications = await Notification.find({});
    if (!notifications) return res.status(404).json({ error: 'Notifications not found' });
    return res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: 'Error while fetching notifications',
    });
  }
});

notificationRouter.put('/markAsRead/:_id', async (req, res) => {
  try {
    const notificationId = req.params._id;
    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    );

    if (!notification) return res.status(404).json({ error: 'Notification not found' });

    await notification.save();
    res.json({
      message: 'Notification marked as read!',
      notification,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Notification update failed!' });
  }
});

export default notificationRouter;