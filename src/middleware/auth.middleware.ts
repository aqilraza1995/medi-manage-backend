import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.js";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const decode = verifyToken(token);

    if (!decode) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    (req as any).user = decode;

    next();

  } catch (error: any) {
    return res.status(401).json({ message: "Invalid token", error: error.message });
  }
};