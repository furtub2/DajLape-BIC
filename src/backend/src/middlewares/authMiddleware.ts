import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UserPayload } from '../types';  // Adjust the path as necessary

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}


const SECRET_KEY = process.env.JWT_SECRET;
if (!SECRET_KEY) {
  console.error('JWT_SECRET is not defined.');
  process.exit(1);
}

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        if (typeof decoded === 'object' && 'userId' in decoded && 'email' in decoded && 'role' in decoded) {
            req.user = decoded as UserPayload;
            next();
        } else {
            return res.status(401).json({ message: 'Invalid token payload' });
        }
    } catch (err) {
        console.error('Token verification failed:', err);
        res.status(401).json({ message: 'Token is not valid' });
    }
};

