import { Router } from "express";
import * as StoreController from "./store.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";
import { createStoreSchema, updateStoreSchema } from "./store.schema.js";

const router = Router();

router.post("/", authenticate, validate(createStoreSchema), StoreController?.createStore)
router.get("/", authenticate, StoreController?.getStores)
router.get("/owner/:ownerId", authenticate, StoreController.getStoreByOwner)
router.get("/:storeId", authenticate, StoreController.getStoreById)
router.put("/:storeId", authenticate, validate(updateStoreSchema), StoreController.updateStore)
router.delete("/:storeId", authenticate, StoreController.deleteStore)

export default router; 