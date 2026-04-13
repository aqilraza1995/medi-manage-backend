import subscriptionModel from "../../models/subscription.model.js";

export const createSubscription = async (data: any) => {
  return subscriptionModel.create(data)
}

export const getSubscription = () =>{
  return subscriptionModel?.find().sort({createdAt: -1}).populate("userId", "name email phone" ).populate("planId")
}

export const getSubscriptions = async (userId: string) => {
  return subscriptionModel?.findOne({ userId, status: "active" })
}

export const updateSubscription = async (id: string, data: any) => {
  return subscriptionModel.findByIdAndUpdate(id, data, { new: true })
}

export const expireOldSubscriptions = async (userId: string) => {
  return subscriptionModel.updateMany(  { userId, status: "active" }, { status: "expired" } );
};

export const getSubscriptionHistory = async (userId: string) => {
  return subscriptionModel.find({ userId }).sort({ createdAt: -1 });
};
