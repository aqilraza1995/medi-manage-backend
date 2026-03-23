import type { Request, Response, NextFunction, RequestHandler } from "express";
import { verifyToken } from "../utils/jwt.js";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req?.headers?.authorization
    if (!authHeader) {
      res?.status(401).json({ message: "Invalid token" })
    }

    const token = authHeader?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const decode = verifyToken(token);

    (req as any).user = decode;

    next();

  } catch (error) {
    res?.status(401).json({ message: "Invalid token" })
  }
}

