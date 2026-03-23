import type { ParamsDictionary } from "express-serve-static-core";

export interface StoreParams extends ParamsDictionary {
  storeId: string;
}