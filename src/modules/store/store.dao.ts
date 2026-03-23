import Store from "../../models/store.model.js";

export const createStore = async (data: any) => {
  return Store.create(data)
}

export const getStoreByOwner = (ownerId: string) => {
  return Store.find({ ownerId })
}

export const getStoreById = (storeId: string) => {
  return Store.findById({ storeId })
}

export const updateStore = (storeId: string, data: any) => {
  return Store.findByIdAndUpdate(storeId, data, { new: true })
}

export const deleteStore = (storeId: string) => {
  return Store.findByIdAndDelete(storeId)
}