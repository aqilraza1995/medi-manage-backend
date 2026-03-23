export const authorizeRole = (...roles: string[]) => {
  return (req: any, res: any, next: any) => {
    if (!roles?.includes(res?.user?.role)) {
      return res.status(403).json({ message: "You don't have permission" });
    }
    next();
  }
}