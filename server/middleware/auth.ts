import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET ?? 'guide-zzyz-dev-secret-change-in-prod';

export interface AuthRequest extends Request {
  userId?:  string;
  username?: string;
}

export function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: '未登录，请先登录' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; username: string };
    req.userId  = decoded.userId;
    req.username = decoded.username;
    next();
  } catch {
    res.status(401).json({ message: '登录已过期，请重新登录' });
  }
}
