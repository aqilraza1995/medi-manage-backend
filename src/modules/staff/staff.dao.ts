import Staff from "../../models/staff.model.js";

export const createStaff = async (data: any) => {
  return Staff.create(data)
}

export const getStaffs = () => {
  return Staff.find().sort({ createdAt: -1 })
}

export const getStaffByOwner = (ownerId: string) => {
  return Staff.find({ ownerId }).sort({ createdAt: -1 })
}

export const getStaffByStore = (storeId: string) => {
  return Staff.find({ storeId }).sort({ createdAt: -1 })
}

export const getStaffById = (staffId: string) => {
  return Staff.findById({ staffId })
}

export const updateStaff = (staffId: string, data: any) => {
  return Staff.findByIdAndUpdate(staffId, data, { new: true })
}

export const deleteStaff = (staffId: string) => {
  return Staff.findByIdAndDelete(staffId)
}