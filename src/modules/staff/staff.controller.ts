import type { Request, Response } from "express";

import * as StaffDao from "./staff.dao.js"
import StaffModel from "../../models/staff.model.js";
import type { getByIdParams } from "../../types/store.js";

export const createStaff = async (req: Request, res: Response) => {
  try {
    const { phone, storeId } = req?.body
    const user: any = (req as any).user;

    console.log("user===========> ", user)

    const existingStaff: any = await StaffModel.findOne({ phone });

    if (existingStaff) {
      if (String(existingStaff.storeId) === String(storeId)) {
        return res.status(400).json({
          success: false,
          message: "This staff already exists in this store."
        });
      }

      return res.status(400).json({
        success: false,
        message: "This staff is already assigned to another store."
      });
    }

    // const result = await StaffDao?.createStaff(req?.body)
    const result = await StaffDao?.createStaff({ ...req?.body, ownerId: user?.userId })
    return res?.status(201).json({ success: true, message: "Staff is created", result })

  } catch (error: any) {
    return res?.status(500).json({ success: false, message: "Internal Server error" })
  }
}

export const getStaffs = async (req: Request, res: Response) => {
  try {
    const staffs = await StaffDao?.getStaffs()
    return res?.status(200).json({ success: true, staffs })

  } catch (error: any) {
    return res?.status(500).json({ success: false, message: "Internal Server error" })
  }
}

export const getStaffById = async (req: Request<getByIdParams>, res: Response) => {
  try {
    const staff = await StaffDao?.getStaffById(req?.params?.id)
    return res?.status(200).json({ success: true, staff })

  } catch (error: any) {
    return res?.status(500).json({ success: false, message: "Internal Server error" })
  }
}

export const getStaffByIStore = async (req: Request<getByIdParams>, res: Response) => {
  try {
    const staff = await StaffDao?.getStaffByStore(req?.params?.id)
    return res?.status(200).json({ success: true, staff })

  } catch (error: any) {
    return res?.status(500).json({ success: false, message: "Internal Server error" })
  }
}

export const getStaffByOwner = async (req: Request<getByIdParams>, res: Response) => {
  try {
    const staff = await StaffDao?.getStaffByOwner(req?.params?.id)
    return res?.status(200).json({ success: true, staff })

  } catch (error: any) {
    return res?.status(500).json({ success: false, message: "Internal Server error" })
  }
}

export const updateStaff = async (req: Request<getByIdParams>, res: Response) => {
  try {
    const { phone, storeId } = req?.body
  if (phone || storeId) {
      const existingStaff: any = await StaffModel.findOne({
        phone,
        _id: { $ne: req.params.id }
      });

      if (existingStaff) {
        if (String(existingStaff.storeId) === String(storeId)) {
          return res.status(400).json({
            success: false,
            message: "This staff already exists in this store."
          });
        }

        return res.status(400).json({
          success: false,
          message: "This staff is already assigned to another store."
        });
      }
    }

    const result = await StaffDao?.updateStaff(req?.params?.id, req?.body)
    return res?.status(201).json({ success: true, message: "Staff updates successfully", result })

  } catch (error: any) {
    return res?.status(500).json({ success: false, message: "Internal Server error" })
  }
}

export const deleteStaff = async (req: Request<getByIdParams>, res: Response) => {
  try {
    const result = await StaffDao?.deleteStaff(req?.params?.id)
    return res?.status(201).json({ success: true, message: "Staff delete successfully", result })

  } catch (error: any) {
    return res?.status(500).json({ success: false, message: "Internal Server error" })
  }
}