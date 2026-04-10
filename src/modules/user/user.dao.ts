import userModel from "../../models/user.model.js";

export const updateUser = (userId: string, updateData: any) => {
    return userModel.findByIdAndUpdate(userId, updateData, { new: true }).exec();
}

export const getUserById = (userId: string) => {
    return userModel.findById(userId)
    .populate("stores")
    .populate("activeSubscription")
    .exec();
}

export const deleteUser = (userId: string) => {
    return userModel.findByIdAndDelete(userId).exec();
}