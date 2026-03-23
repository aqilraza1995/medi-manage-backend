import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const generateToken = (payload: any) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "7d"
  })
}

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET)
}