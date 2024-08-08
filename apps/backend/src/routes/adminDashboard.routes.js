// routes/adminDashboard.routes.js
const Router = express.Router();

const adminDashboardRouter = Router();

// Admin Dashboard Route
adminDashboardRouter.get('/', (req, res) => {
  res.send('Welcome to the Admin Dashboard');
});

export default adminDashboardRouter;