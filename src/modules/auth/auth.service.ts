import * as AuthDao from "./auth.dao.js";
import bcrypt from "bcrypt"
import { generateToken } from "../../utils/jwt.js";


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
  const token = generateToken({ userId: user?._id, role: user.role })
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

  const userObj = user.toObject();
  const { password, ...userWithoutPassword } = userObj;

  return { user: userWithoutPassword, token, subscription: user.activeSubscriptionId }
}