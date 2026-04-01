import { Router } from "express";
import * as SubscriptionController from "./subscription.controller.js"
import { authenticate } from "../../middleware/auth.middleware.js";

const router = Router()

router.get("/plans", SubscriptionController?.getPlan)
router.get("/my", authenticate, SubscriptionController?.getMySubscription)
router.post("/activate", authenticate, SubscriptionController?.activatePlan)
router.get("/current-plan", authenticate, SubscriptionController.getCurrentPlanInfo);


export default router
