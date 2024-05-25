import { Request, Response } from 'express';
import { prisma } from '../database';
import { offerSchema } from '../validationSchemas';
import bcrypt from 'bcryptjs';
import multer from 'multer';

const storage = multer.memoryStorage(); // Przechowuje pliki w pamięci jako Buffer
const upload = multer({ storage: storage });
export const uploadMiddleware = upload.single('image');

export const createOffer = async (req: Request, res: Response) => {
  try {
    console.log('Request Body:', req.body);
    console.log('Request File:', req.file);

    const { petName, age, description, petType, localization, breeds, shelterId } = req.body;
    const image = req.file?.buffer; // Pobierz obraz jako Buffer
    const imageName = req.file?.originalname;

    const validationResult = offerSchema.validate({
      petName,
      age,
      description,
      petType,
      localization,
      breeds,
      shelterId,
      image,
      imageName,
    }, { abortEarly: false });

    if (validationResult.error) {
      console.error('Validation Error:', validationResult.error.details);
      return res.status(400).json({ message: 'Validation error', details: validationResult.error.details });
    }

    const offer = await prisma.offer.create({
      data: {
        image,
        imageName,
        petName,
        age: parseInt(age),
        description,
        petType,
        localization,
        breeds,
        shelterId: parseInt(shelterId),
      },
    });

    res.status(201).json(offer);
  } catch (error: any) {
    console.error('Error creating offer:', error);
    res.status(500).json({ message: 'Error creating offer', error: error.message });
  }
};

  export const updateOffer = async (req: Request, res: Response) => {
    try {
      const { value, error } = offerSchema.validate(req.body, { abortEarly: false });
  
      if (error) {
        return res.status(400).json({ message: 'Validation error', details: error.details });
      }
  
      const { id,image, petName, age, description, petType, localization, breeds } = value;
  
      const offer = await prisma.offer.update({
        where: {
            id: parseInt(id)
        },
        data: {
          image: image,
          petName: petName,
          age: age,
          description: description,
          petType: petType,
          localization: localization,
          breeds: breeds,
        },
      });
  
      res.status(201).json(offer);
    } catch (error: any) {
      res.status(500).json({ message: 'Error creating offer', error: error.message });
    }
  };

  export const getShelterOffers = async (req: Request, res: Response) => {
    console.log(req.query)
    console.log('getShelter')
    try {
      const { shelterId } = req.query;
      console.log({shelterId})

      const offers = await prisma.offer.findMany({
        where: {
          shelterId:Number(shelterId)
        }
      });
  
      res.status(201).json(offers);
    } catch (error: any) {
      res.status(500).json({ message: 'Unable to get any offer', error: error.message });
    }
  };