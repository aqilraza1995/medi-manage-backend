import type { ParamsDictionary } from "express-serve-static-core";

export interface StoreParams extends ParamsDictionary {
  storeId: string;
}
export interface getByIdParams extends ParamsDictionary {
  id: string;
}