import express from 'express';
import { authorizeRoles } from '../middlewares/roleMiddleware';
import {createOffer, getShelterOffers, updateOffer, uploadMiddleware} from '../controllers/shelterController';

const router = express.Router();

router.post('/createOffer', authorizeRoles('SHELTER'),uploadMiddleware, createOffer);

router.post('/updateOffer', authorizeRoles('SHELTER'), updateOffer);

router.get('/getShelterOffers', authorizeRoles('SHELTER'), getShelterOffers);


export default router;
