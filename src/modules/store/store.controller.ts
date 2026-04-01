import type { Request, Response } from "express";
import * as StoreDao from "./store.dao.js"
import type{ StoreParams } from "../../types/store.js";


export const createStore = async (req: Request, res: Response) => {
  try {
    const user: any = (req as any).user;

    const store = await StoreDao?.createStore({ ...req?.body, ownerId: user?.userId })
    return res?.status(201).json({ success: true, data: store })

  } catch (error: any) {
    res.status(500).json({ success: false, message: error?.message })
  }
}

export const getStores = async (req: Request, res: Response) => {
  try {
   
    const store = await StoreDao?.getStores()
    return res?.status(200).json({ success: true, data: store })
  
  } catch (error: any) {
    res.status(500).json({ success: false, message: error?.message })
  }
}

export const getStoreByOwner = async (req: Request, res: Response) => {
  try {
    const user: any = (req as any).user;

    const store = await StoreDao?.getStoreByOwner(user?.userId)
    return res?.status(200).json({ success: true, data: store })
  
  } catch (error: any) {
    res.status(500).json({ success: false, message: error?.message })
  }
}

export const getStoreById = async (req: Request<StoreParams>, res: Response) => {
  try {
    const { storeId } = req?.params;
    if (!storeId) {
      return res?.status(400).json({ success: false, message: "Store ID is required" })
    }

    const store = await StoreDao?.getStoreById(storeId)
    return res?.status(200).json({ success: true, data: store })
  
  }
  catch (error: any) {
    res.status(500).json({ success: false, message: error?.message })
  }
}

export const updateStore = async (req: Request<StoreParams>, res: Response) => {
  try {
    const { storeId } = req?.params;
    const store = await StoreDao?.updateStore(storeId, req?.body)
    return res?.status(200).json({ success: true, data: store })
  
  } catch (error: any) {
    res.status(500).json({ success: false, message: error?.message })
  }
}

export const deleteStore = async (req: Request<StoreParams>, res: Response) => {
  try {
    const { storeId } = req?.params;
    await StoreDao?.deleteStore(storeId)
    return res?.status(200).json({ success: true, message: "Store deleted successfully" })
  
  } catch (error: any) {
    res.status(500).json({ success: false, message: error?.message })
  }
}