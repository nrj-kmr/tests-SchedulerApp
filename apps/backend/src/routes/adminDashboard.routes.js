// routes/adminDashboard.routes.js
import express from 'express';
const router = express.Router();

const adminDashboardRouter = express.Router();

// Admin Dashboard Route
adminDashboardRouter.get('/', (req, res) => {
  res.send('Welcome to the Admin Dashboard');
});

export default adminDashboardRouter;