import userModel from "../../models/user.model.js";


export const findUserByEmail = async (email: string) => {
  return userModel.findOne({ email })
}

export const createUser = async (data: any) => {
  return userModel.create(data)
}