import type { Request, Response } from "express";

import * as CategoryDao from "./category.dao.js"
import CategoryModel from "../../models/category.model.js";
import type { getByIdParams } from "../../types/store.js";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req?.body
    const existing = await CategoryModel?.find({ name })
    if (existing) {
      return res?.status(400).json({ success: false, message: "Category is already exist." })
    }

    const result = await CategoryDao?.createCategory(req?.body)
    return res?.status(201).json({ success: true, message: "Category is created", result })

  } catch (error: any) {
    return res?.status(500).json({ success: false, message: "Internal Server error" })
  }
}

export const getCategories = async (req: Request, res: Response) => {
  try {
    const category = await CategoryDao?.getCategories()
    return res?.status(200).json({ success: true, category })

  } catch (error: any) {
    return res?.status(500).json({ success: false, message: "Internal Server error" })
  }
}

export const getCategoryById = async (req: Request<getByIdParams>, res: Response) => {
  try {
    const category = await CategoryDao?.getCategoryById(req?.params?.id)
    return res?.status(200).json({ success: true, category })

  } catch (error: any) {
    return res?.status(500).json({ success: false, message: "Internal Server error" })
  }
}

export const updateCategory = async (req: Request<getByIdParams>, res: Response) => {
  try {
    const existing = await CategoryModel?.find(req?.body?.name)
    if (existing) {
      return res?.status(400).json({ success: false, message: "Category is already exist." })
    }
    const result = await CategoryDao?.updateCategory(req?.params?.id, req?.body)
    return res?.status(201).json({ success: true, message: "Category updates successfully", result })

  } catch (error: any) {
    return res?.status(500).json({ success: false, message: "Internal Server error" })
  }
}

export const deleteCategory = async (req: Request<getByIdParams>, res: Response) => {
  try {
    const result = await CategoryDao?.deleteCategory(req?.params?.id)
    return res?.status(201).json({ success: true, message: "Category delete successfully", result })

  } catch (error: any) {
    return res?.status(500).json({ success: false, message: "Internal Server error" })
  }
}