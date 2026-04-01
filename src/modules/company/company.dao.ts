import CompanyModel from "../../models/company.model.js"

export const createCompany = (data: any) => {
  return CompanyModel?.create(data)
}

export const getCompanies = () => {
  return CompanyModel?.find().sort({ createdAt: -1 })
}

export const getCompanyById = (id: string) => {
  return CompanyModel?.find({ _id: id })
}

export const updateCompany = (id: string, data: any) => {
  return CompanyModel?.findByIdAndUpdate(id, data, { new: true })
}

export const deleteCompany = (id: string) => {
  return CompanyModel?.findByIdAndDelete(id)
}