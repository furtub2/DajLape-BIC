import { Request, Response } from 'express';
import { prisma } from '../database';
import { offerSchema } from '../validationSchemas';

export const getLastFourOffers = async (req: Request, res: Response) => {
    try {
  
      const offer = await prisma.offer.findMany({
        skip: 0, 
        take: 4
      })
  
      res.status(201).json(offer);
    } catch (error: any) {
      res.status(500).json({ message: 'Unable to get any offer', error: error.message });
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
  
  export const getFilteredOffers = async (req: Request, res: Response) => {
    try {
        const { petType, localization, age, breeds } = req.query;

        const queryFilters: any = {};

        if (petType) {
            queryFilters.petType = petType as string;
        }
        if (localization) {
            queryFilters.localization = localization as string;
        }
        if (age) {
            queryFilters.age = parseInt(age as string, 10);
            if (isNaN(queryFilters.age)) {
                return res.status(400).json({ message: 'Invalid age value' });
            }
        }
        if (breeds) {
            queryFilters.breeds = breeds as string;
        }

        const offers = await prisma.offer.findMany({
            where: queryFilters
        });

        if (offers.length > 0) {
            res.status(200).json(offers);
        } else {
            res.status(404).json({ message: 'No offers found with the provided filters' });
        }
    } catch (error: any) {
        res.status(500).json({ message: 'Unable to get offers', error: error.message });
    }
};
