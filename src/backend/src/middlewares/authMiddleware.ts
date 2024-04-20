import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Define the type for the expected user payload in the JWT
interface UserPayload {
    id: number;
    email: string;
    password: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
  }  

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

export const validateToken = (req: Request & { user?: UserPayload }, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY) //as JwtPayload;

        if (typeof decoded === 'object' && 'id' in decoded) {
            req.user = decoded as UserPayload; // Type assertion to UserPayload
            next();
        } else {
            throw new Error('Invalid token payload');
        }
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};
