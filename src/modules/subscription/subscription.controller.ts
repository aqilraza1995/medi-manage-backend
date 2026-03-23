import { response, type Request, type Response } from "express";
import * as subscrionDao from "./subscription.dao.js"
import Plan from "../../models/plan.model.js"

export const getPlan = async (req: Request, res: Response) => {
  const plan = await Plan.find()
  res.json({ success: true, data: plan })
}

export const getMySubscription = async (req: any, res: Response) => {
  const subscription = await subscrionDao.getSubscriptions(req?.user?.userId)
  res.json({ success: true, data: subscription })
}

export const activatePlan = async (req: any, res: Response) => {
  const { planId } = req?.body
  const plan: any = await Plan?.findById(planId)

  if (!plan) {
    return res.status(400).json({ message: "Plan not found" })
  }

  const startDate = new Date()
  const endDate = new Date()

  endDate.setMonth(endDate.getMonth(), plan?.duration)

  const subscription = await subscrionDao.createSubscription({
    userId: req?.user?.userId,
    planId: plan?._id,
    planName: plan?.name,
    storeLimit: plan?.storeLimit,
    startDate: startDate,
    endDate: endDate,
    isTrial: false
  })
  res.json({ success: true, data: subscription })
}