import userModel from "../../models/user.model.js";


export const findUserByEmail = async (email: string) => {
  return await userModel.findOne({ email })
}

export const createUser = async (data: any) => {
  return userModel.create(data)
}

export const getUserById = async (id: string) => {
  return userModel.findById(id).populate("activeSubscriptionId");
};