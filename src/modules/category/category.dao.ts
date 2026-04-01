import CategoryModel from "../../models/category.model.js"

export const createCategory = (data: any) => {
  return CategoryModel?.create(data)
}

export const getCategories = () => {
  return CategoryModel?.find().sort({ createdAt: -1 })
}

export const getCategoryById = (id: string) => {
  return CategoryModel?.find({ _id: id })
}

export const updateCategory = (id: string, data: any) => {
  return CategoryModel?.findByIdAndUpdate(id, data, { new: true })
}

export const deleteCategory = (id: string) => {
  return CategoryModel?.findByIdAndDelete(id)
}