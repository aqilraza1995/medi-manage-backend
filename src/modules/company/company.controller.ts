import type { Request, Response } from "express";

import * as ComapanyDao from "./company.dao.js"
import CompanyModel from "../../models/company.model.js";
import type { getByIdParams } from "../../types/store.js";

export const createCompany = async (req: Request, res: Response) => {
  try {
    const { name } = req?.body
    const existing = await CompanyModel?.find({ name })
    if (existing) {
      return res?.status(400).json({ success: false, message: "Comapny is already exist." })
    }

    const result = await ComapanyDao?.createCompany(req?.body)
    return res?.status(201).json({ success: true, message: "Company is created", result })

  } catch (error: any) {
    return res?.status(500).json({ success: false, message: "Internal Server error" })
  }
}

export const getCompany = async (req: Request, res: Response) => {
  try {
    const company = await ComapanyDao?.getCompanies()
    return res?.status(200).json({ success: true, company })
  } catch (error: any) {
    return res?.status(500).json({ success: false, message: "Internal Server error" })
  }
}

export const getCompanyById = async (req: Request<getByIdParams>, res: Response) => {
  try {
    const company = await ComapanyDao?.getCompanyById(req?.params?.id)
    return res?.status(200).json({ success: true, company })
 
  } catch (error: any) {
    return res?.status(500).json({ success: false, message: "Internal Server error" })
  }
}

export const updateCompany = async (req: Request<getByIdParams>, res: Response) => {
  try {
    const existing = await CompanyModel?.find(req?.body?.name)
    if (existing) {
      return res?.status(400).json({ success: false, message: "Comapny is already exist." })
    }
    const result = await ComapanyDao?.updateCompany(req?.params?.id, req?.body)
    return res?.status(201).json({ success: true, message: "Company updates successfully", result })
 
  } catch (error: any) {
    return res?.status(500).json({ success: false, message: "Internal Server error" })
  }
}

export const deleteCompany = async (req: Request<getByIdParams>, res: Response) => {
  try {
    const result = await ComapanyDao?.deleteCompany(req?.params?.id)
    return res?.status(201).json({ success: true, message: "Company delete successfully", result })
 
  } catch (error: any) {
    return res?.status(500).json({ success: false, message: "Internal Server error" })
  }
}