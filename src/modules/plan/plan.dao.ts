import Plan from "../../models/plan.model.js"

export const createPlan = (data: any) => {
  return Plan.create(data)
}

export const getPlans = () => {
  return Plan.find().sort({ createdAt: -1 })
}

export const getPlanById = (id: string) => {
  return Plan.findById({ _id: id })
}

export const updatePlan = (id: string, data: any) => {
  return Plan.findByIdAndUpdate(id, { $set: data }, { new: true })
}

export const deletePlan = (id: string) => {
  return Plan.findByIdAndDelete(id)
}