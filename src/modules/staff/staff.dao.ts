import Staff from "../../models/staff.model.js";

export const createStaff = async (data: any) => {
  return Staff.create(data)
}

export const getStaffs = () => {
  return Staff.find().sort({ createdAt: -1 }).populate("shopId", "name address").populate("ownerId", "name role")
}

export const getStaffByOwner = (ownerId: string) => {
  return Staff.find({ ownerId }).sort({ createdAt: -1 }).populate("storeId", "name address").populate("ownerId", "name role")
}

export const getStaffByStore = (storeId: string) => {
  return Staff.find({ storeId }).sort({ createdAt: -1 }).populate("storeId", "name address").populate("ownerId", "name role")
}

export const getStaffById = (staffId: string) => {
  return Staff.findById({_id: staffId }).populate("shopId", "name address").populate("ownerId", "name role")
}

export const updateStaff = (staffId: string, data: any) => {
  return Staff.findByIdAndUpdate(staffId, data, { new: true })
}

export const deleteStaff = (staffId: string) => {
  return Staff.findByIdAndDelete(staffId)
}