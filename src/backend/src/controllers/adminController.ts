import { Request, Response } from 'express';
import { prisma } from '../database';
import { offerSchema } from '../validationSchemas';
import { userSchema } from '../validationSchemas';
import bcrypt from 'bcryptjs';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { value, error } = userSchema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({ message: 'Validation error', details: error.details });
    }

    const { email, password, role } = value;

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email is already in use.' });
    }

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

export const createOffer = async (req: Request, res: Response) => {
  try {
    const { value, error } = offerSchema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({ message: 'Validation error', details: error.details });
    }

    const { image, petName, age, description, petType, localization, breeds, shelterId } = value;

    const offer = await prisma.offer.create({
      data: {
        image,
        petName,
        age,
        description,
        petType,
        localization,
        breeds,
        shelterId,
      },
    });

    res.status(201).json(offer);
  } catch (error: any) {
    res.status(500).json({ message: 'Error creating offer', error: error.message });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {

    const users = await prisma.user.findMany()

    res.status(201).json(users);
  } catch (error: any) {
    res.status(500).json({ message: 'Unable to get any user', error: error.message });
  }
};


export const getAllOffers = async (req: Request, res: Response) => {
  try {

    const offer = await prisma.offer.findMany()

    res.status(201).json(offer);
  } catch (error: any) {
    res.status(500).json({ message: 'Unable to get any offer', error: error.message });
  }
};

export const deleteSpecificOffer = async (req: Request, res: Response) => {
  try {

    const {offerId} = req.query;
    const id = parseInt(offerId as string, 10);

    const offer = await prisma.offer.delete({
      where:{
        id: id
      }
    })

    res.status(201).json("Offer was successfully deleted");
  } catch (error: any) {
    res.status(500).json({ message: 'Unable to delete an offer', error: error.message });
  }
};

export const deleteSpecificUser = async (req: Request, res: Response) => {
  try {

    const {userId} = req.query;
    const id = parseInt(userId as string, 10);

    const user = await prisma.user.delete({
      where:{
        id: id
      }
    })

    res.status(201).json("User was successfully deleted");
  } catch (error: any) {
    res.status(500).json({ message: 'Unable to delete a user', error: error.message });
  }
};