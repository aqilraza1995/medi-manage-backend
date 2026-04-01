import { Router } from "express";

import * as CategoryController from "./category.controller.js"
import { validate } from "../../middleware/validate.middleware.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import { createUpdateCategorySchame } from "./category.schema.js";

const router = Router()

router.post("/", authenticate, validate(createUpdateCategorySchame), CategoryController?.createCategory)
router.get("/", authenticate, CategoryController?.getCategories)
router.get("/:id", authenticate, CategoryController?.getCategoryById)
router.put("/:id", authenticate, validate(createUpdateCategorySchame), CategoryController?.updateCategory)
router.delete("/:id", authenticate, CategoryController?.deleteCategory)

export default router
