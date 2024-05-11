import { prisma } from "../database";
import { Request, Response } from 'express';

export const getAllOffers = async (req: Request, res: Response) => {
    try {
  
      const offer = await prisma.offer.findMany()
  
      res.status(201).json(offer);
    } catch (error: any) {
      res.status(500).json({ message: 'Unable to get any offer', error: error.message });
    }
  };