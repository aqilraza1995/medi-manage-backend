import { Router } from "express";
import * as PlanController from "../plan/plan.controller.js"
import { authenticate } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";
import { createPlanSchema, updatePlanSchema } from "./plan.schema.js";

const router = Router();

router.post("/", authenticate, validate(createPlanSchema), PlanController?.createPlan)
router.get("/", authenticate, PlanController?.getPlans)
router.get("/:id", authenticate, PlanController?.getPlanById)
router.put("/:id", authenticate, validate(updatePlanSchema), PlanController?.updatePlan)
router.delete("/:id", authenticate, PlanController?.deletePlan)

export default router;