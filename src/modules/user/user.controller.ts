import { Request, Response } from "express";
import * as userDao from "./user.dao.js";
import { getByIdParams } from "../../types/store.js";

export const updateUser = async (req: Request<getByIdParams>, res: Response) => {
    try {
        const { storeId, activeSubscription, ...otherData } = req.body;

        let updateData: any = { ...otherData };

        // Onboarding time update
        if (storeId) {
            updateData.$addToSet = { stores: storeId };
            updateData.onboardingCompleted = true;
        }

        // Subscription time update
        if (activeSubscription) {
            updateData.activeSubscription = activeSubscription;
        }

        const updatedUser = await userDao.updateUser(req?.params?.id, updateData);

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({ success: true, message: "User updated successfully", data: updatedUser });

    } catch (error: any) {
        return res?.status(500).json({ success: false, message: error?.message })
    }
};