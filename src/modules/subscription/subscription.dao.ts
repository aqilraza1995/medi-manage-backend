import subscriptionModel from "../../models/subscription.model.js";

export const createSubscription = async (data: any) => {
  return subscriptionModel.create(data)
}

export const getSubscriptions = async (userId: string) => {
  return subscriptionModel?.findOne({ userId, status: "active" })
}

export const updateSubscription = async (id: string, data: any) => {
  return subscriptionModel.findByIdAndUpdate(id, data, { new: true })
}