import type { Request, Response } from "express";
import * as subscriptionDao from "./subscription.dao.js";
import Plan from "../../models/plan.model.js";


// ✅ Get Plans
export const getPlan = async (req: Request, res: Response) => {
  const plans = await Plan.find({ isActive: true });
  res.json({ success: true, data: plans });
};


// ✅ Get My Subscription
export const getMySubscription = async (req: any, res: Response) => {
  const subscription = await subscriptionDao.getSubscriptions(req.user.userId);
  res.json({ success: true, data: subscription });
};


// ✅ Activate Plan (UPDATED)
export const activatePlan = async (req: any, res: Response) => {
  try {

    const { planId, duration } = req.body;

    const plan: any = await Plan.findById(planId);

    if (!plan) {
      return res.status(400).json({ message: "Plan not found" });
    }

    // ✅ check duration valid or not
    if (!plan.durations.includes(duration)) {
      return res.status(400).json({message: "Invalid duration selected"});
    }

    // ✅ get pricing
    const selectedPricing = plan.pricing.get(duration.toString());

    if (!selectedPricing) {
      return res.status(400).json({message: "Pricing not found" });
    }

    const startDate = new Date();

    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + duration);

    await subscriptionDao.expireOldSubscriptions(req.user.userId);

    // ✅ create subscription with snapshot
    const subscription = await subscriptionDao.createSubscription({
      userId: req.user.userId,
      planId: plan._id,
      duration,

      planSnapshot: {
        name: plan.name,
        storeLimit: plan.maxStores,
        price: selectedPricing.total,
        duration
      },

      startDate,
      endDate,
      isTrial: false,
      status: "active"
    });

    res.json({ success: true, message:"Plan activated successfully", data: subscription });

  } catch (error: any) {

    res.status(500).json({
      message: error.message
    });

  }
};


export const getCurrentPlanInfo = async (req: any, res: Response) => {
  try {
    const subscription: any = await subscriptionDao.getSubscriptions(req.user.userId);

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "No active subscription found"
      });
    }

    return res.json({
      success: true,
      data: {
        currentPlan: subscription.planSnapshot.name,
        storeLimit: subscription.planSnapshot.storeLimit,
        duration: subscription.duration,
        startDate: subscription.startDate,
        endDate: subscription.endDate,
        status: subscription.status
      }
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getSubscriptions = async (req: Request, res: Response) => {
  try {
   
    const subscriptions = await subscriptionDao?.getSubscription()
    return res?.status(200).json({ success: true, data: subscriptions })
  
  } catch (error: any) {
    res.status(500).json({ success: false, message: error?.message })
  }
}