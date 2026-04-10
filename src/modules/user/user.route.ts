import Router from "express"
import * as userController from "./user.controller.js"
import { authenticate } from "../../middleware/auth.middleware.js"


const router = Router()

router.put("/:id", authenticate, userController?.updateUser)

export default router
