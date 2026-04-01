import { Router } from "express";
import authRoutes from "../modules/auth/auth.route.js";
import storeRoutes from "../modules/store/store.route.js";
import subscriptionRoute from "../modules/subscription/subscription.route.js"
import PlanRoute from "../modules/plan/plan.route.js"
import CompanyRoute from "../modules/company/company.route.js"
import CategoryRouter from "../modules/category/category.route.js"
import StaffRouter from "../modules/staff/staff.route.js"

const router = Router()

// Auth
router.use("/auth", authRoutes);

// Store
router.use("/stores", storeRoutes);

// Subsciption
router.use("/subscription", subscriptionRoute);

// Plan
router.use("/plan", PlanRoute);

// Company
router.use("/company", CompanyRoute);

// Category
router.use("/category", CategoryRouter);

// Staff
router.use("/staff", StaffRouter);


export default router;