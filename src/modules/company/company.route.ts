import { Router } from "express";

import * as CompanyController from "./company.controller.js"
import { validate } from "../../middleware/validate.middleware.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import { createUpdateCompanySchame } from "./company.schema.js";

const router = Router()

router.post("/", authenticate, validate(createUpdateCompanySchame), CompanyController?.createCompany)
router.get("/", authenticate, CompanyController?.getCompany)
router.get("/:id", authenticate, CompanyController?.getCompanyById)
router.put("/:id", authenticate, validate(createUpdateCompanySchame), CompanyController?.updateCompany)
router.delete("/:id", authenticate, CompanyController?.deleteCompany)

export default router
