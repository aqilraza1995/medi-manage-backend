import * as AuthDao from "./auth.dao.js";
import bcrypt from "bcrypt"
import { generateToken } from "../../utils/jwt.js";
import planModel from "../../models/plan.model.js";
import userModel from "../../models/user.model.js";
import subscriptionModel from "../../models/subscription.model.js";


export const registerUser = async (data: any) => {
  const existingUser = await AuthDao.findUserByEmail(data?.email)

  if (existingUser) {
    throw new Error("User already exist")
  }

  const hashPassword = await bcrypt.hash(data?.password, 10)

  const user = await AuthDao.createUser({
    name: data?.name,
    email: data?.email,
    password: hashPassword,
    phone: data?.phone,
    role: "owner",
  })

  const freePlan = await planModel?.find({ name: { $regex: /^free$/i }, isActive: true })

  if (!freePlan) {
    throw new Error("Free plan not found. Please create a free plan first.");
  }

  const duration = freePlan[0]?.durations[0] || 1;
  const pricing = freePlan[0]?.pricing.get(duration.toString())
  const startDate = new Date()
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + duration)

  const subscription = await subscriptionModel.create({
    userId: user?._id,
    planId: freePlan[0]?._id,
    duration,
    planSnapshot: {
      name: freePlan[0]?.name,
      storeLimit: freePlan[0]?.maxStores,
      pricing: pricing?.total || 0,
      duration
    },
    startDate,
    endDate,
    isTrial: true,
    status: "active"
  })

  await userModel?.findByIdAndUpdate(user?._id, { activeSubscriptionId: subscription._id })
  const token = generateToken({ userId: user?._id, role: user.role })
  return { user, token, subscription }
}


export const loginUser = async (data: any) => {
  const user: any = await AuthDao.findUserByEmail(data?.email)
  if (!user) {
    throw new Error("Invalid Credentials")
  }

  const isPasswordValid = await bcrypt.compare(data?.password, user?.password)

  if (!isPasswordValid) {
    throw new Error("Invalid Credentials")
  }

  const token = generateToken({
    userId: user?._id,
    role: user?.role
  })

  return { user, token, subscription: user.activeSubscriptionId }
}