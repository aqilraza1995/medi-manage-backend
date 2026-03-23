import { Router } from "express";
import authRoutes from "../modules/auth/auth.route.js";
import storeRoutes from "../modules/store/store.route.js";
import subscriptionRoute from "../modules/subscription/subscription.route.js"

const router = Router()

// Auth
router.use("/auth", authRoutes);

// Store
router.use("/stores", storeRoutes);

// Subsciption
router.use("/subscription", subscriptionRoute);


export default router;