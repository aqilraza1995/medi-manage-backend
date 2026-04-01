import type { Request, Response } from "express"

import * as PlanDao from "./plan.dao.js"
import planModel from "../../models/plan.model.js"
import type { getByIdParams } from "../../types/store.js"


export const createPlan = async (req: Request, res: Response) => {
  try {
    const { name, durations, pricing } = req?.body
    const existingPlan = await planModel?.findOne({ name })

    if (existingPlan) {
      return res?.status(400).json({ success: false, message: "Plan already exist" })
    }

    const pricingKey = Object.keys(pricing || {})
    const durationString = durations?.map((d: number) => String(d))

    const isValidPricing = durationString.every((d: string) => pricingKey?.includes(d))

    if (!isValidPricing) {
      return res.status(400).json({ success: false, message: "Pricing keys must match durations" });
    }

    const plan = await PlanDao?.createPlan(req.body)
    return res.status(201).json({ success: true, message: "Plan created successfully", data: plan });

  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export const getPlans = async (req: Request, res: Response) => {
  try {

    const { admin } = req?.query
    const filter = admin === "true" ? {} : { isActive: true }
    const plan = await planModel.find(filter).sort({ createdAt: -1 })
    return res.json({ success: true, data: plan });

  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export const getPlanById = async (req: Request<getByIdParams>, res: Response) => {
  try {

    const plan = await PlanDao?.getPlanById(req?.params?.id)
    if (!plan) {
      return res.status(404).json({ success: false, message: "Plan not found" });
    }
    return res.json({ success: true, data: plan });

  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export const updatePlan = async (req: Request<getByIdParams>, res: Response) => {
  try {
    const { name, durations, pricing } = req?.body
    if (name) {
      const existing = await planModel?.findOne({ name, _id: { $ne: req?.params?.id } })
      if (existing) {
        return res.status(400).json({ success: false, message: "Plan name already exists" });
      }
    }
    if (durations && pricing) {
      const princingKey = Object.keys(pricing)
      const durationKeyString = durations?.map((d: number) => String(d))

      const isValidPricing = durationKeyString?.every((d: string) => princingKey?.includes(d))

      if (!isValidPricing) {
        return res.status(400).json({ success: false, message: "Pricing keys must match durations" });
      }
    }
    if (pricing) {
      const existingPlan = await planModel.findById(req?.params?.id);

      if (!existingPlan) {
        return res.status(404).json({ success: false, message: "Plan not found" });
      }

      const mergedPricing = {
        ...Object.fromEntries(existingPlan.pricing || []),
        ...pricing
      };

      req.body.pricing = mergedPricing;
    }

    const updatedPlan = await PlanDao.updatePlan(
      req.params.id,
      req.body
    );

    if (!updatedPlan) {
      return res.status(404).json({  success: false, message: "Plan not found" });
    }

    res.json({ success: true, message: "Plan updated successfully", data: updatedPlan });

  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export const deletePlan = async (req: Request<getByIdParams>, res: Response) => {
  try {

    const plan = await PlanDao?.deletePlan(req.params.id)
    res.json({ success: true, message: "Plan delete successfully", data: plan });

  } catch (error: any) {
    res.status(500).json({ success: false,  message: error.message});
  }
};