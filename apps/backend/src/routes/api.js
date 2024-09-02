import { Router } from "express";
import userRouter from "./user.routes.js";
import adminRouter from "./admin.routes.js";
import superAdminRouter from "./superAdmin.routes.js";
import notificationRouter from "./notification.routes.js";

const Api = Router();

// use the user routes
Api.use('/api/user', userRouter);

// use the admin routes
Api.use('/api/admin', adminRouter);

// use notification route
Api.use('/api/notifications', notificationRouter);

// use the superAdmin routes
Api.use('/api/superAdmin', superAdminRouter);

export default Api;