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

  export const getSpecificOffer = async (req: Request, res: Response) => {
    try {
      const { offerId } = req.query;
      const id = parseInt(offerId as string, 10);
  
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid offer ID' });
      }
  
      const offer = await prisma.offer.findUnique({
        where: {
          id: id
        }
      });
  
      if (offer) {
        res.status(200).json(offer);
      } else {
        res.status(404).json({ message: 'Offer not found' });
      }
    } catch (error: any) {
      res.status(500).json({ message: 'Unable to get any offer', error: error.message });
    }
  };