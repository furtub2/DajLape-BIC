import { Request, Response } from 'express';
import { prisma } from '../database';
import bcrypt from 'bcryptjs';
import Joi from 'joi';

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('admin', 'user', 'shelter').required(),
});

export const createUser = async (req: Request, res: Response) => {
  try {
    const { value, error } = userSchema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({ message: 'Validation error', details: error.details });
    }

    const { email, password, role } = value;

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role, 
      },
    });

    const { password: _, ...userWithoutPassword } = user;
    res.status(201).json(userWithoutPassword);
  } catch (error: any) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};
