import { Router } from "express";

import * as StaffController from "./staff.controller.js"
import { validate } from "../../middleware/validate.middleware.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import { createUpdateStaffSchema } from "./staff.schema.js";


const router = Router()

router.post("/", authenticate, validate(createUpdateStaffSchema), StaffController?.createStaff)
router.get("/", authenticate, StaffController?.getStaffs)
router.get("/shop/:id", authenticate, StaffController?.getStaffByIStore)
router.get("/owner/:id", authenticate, StaffController?.getStaffByOwner)
router.get("/:id", authenticate, StaffController?.getStaffById)
router.put("/:id", authenticate, validate(createUpdateStaffSchema), StaffController?.updateStaff)
router.delete("/:id", authenticate, StaffController?.deleteStaff)

export default router