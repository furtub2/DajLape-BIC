import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { userSchema } from '../validationSchemas';
import { prisma } from '../database'; 
import { loadConfigFromYAML } from '../config';

const config = loadConfigFromYAML('./config/server.yaml')

export const register = async (req: Request, res: Response) => {

  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).send('All fields are required');
  }

  const { value, error } = userSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({ message: 'Validation error', details: error.details });
  }

  if (!['USER', 'SHELTER'].includes(role.toUpperCase())) {
    return res.status(400).send('Invalid role specified!');
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return res.status(400).send('Email already in use');
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: role.toUpperCase(),
      },
    });

    const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET!, {
        expiresIn: '24h',
    });
      

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    res.status(500).send('Error registering user');
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  // Basic input validation
  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).send('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send('Invalid email or password');
    }
    console.log(config.JWT_SECRET)
    // Ensure the JWT_SECRET is safely loaded
    const secret = config.JWT_SECRET;
    if (!secret) {
      console.error('JWT_SECRET is not defined');
      return res.status(500).send('Internal server error');
    }

    const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, secret, {
        expiresIn: '24h',
    });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Internal server error');
  }
};
  
