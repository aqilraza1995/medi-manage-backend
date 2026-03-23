import * as AuthDao from "./auth.dao.js";
import bcrypt from "bcrypt"
import { generateToken } from "../../utils/jwt.js";
import Subscription from "../../models/subscription.model.js";


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
    mobile: data?.mobile,
    role: "owner",
  })

  // ✅ TRIAL SUBSCRIPTION CREATE
  const startDate = new Date();

  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 30);

  await Subscription.create({
    userId: user._id,
    planName: "trial",
    storeLimit: 3,
    startDate,
    endDate,
    isTrial: true
  });

  const token = generateToken({ userId: user?._id })

  return { user, token }
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

  return { user, token }
}

