import type { Request, Response } from "express";
import * as AuthService from "./auth.service.js"
// import userModel from "../../models/user.model.js";



export const register = async (req: Request, res: Response) => {
  try {
    const result = await AuthService?.registerUser(req?.body)
    res?.status(201).json({ success: true, message:"User registration successfull", data: result })
  } catch (error: any) {
    res?.status(500).json({ success: false, message: error?.message })
  }
}


export const login = async (req: Request, res: Response) => {
  try {
    const result = await AuthService?.loginUser(req?.body)
    res?.status(201).json({ success: true, data: result })
  } catch (error: any) {
    res?.status(500).json({ success: false, message: error?.message })
  }
}

// export const getProfile = async (req: Request, res: Response) => {
//   try {
//     const user = await userModel.findById(req?.params?.userId)
//   } catch (error: any) {
  
//   }
// };