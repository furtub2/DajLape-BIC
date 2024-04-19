import { PrismaClient, User } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';
const EXPIRES_IN = '24h';

export const generateToken = (user: User): string => {
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role
    };

    return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRES_IN });
};
