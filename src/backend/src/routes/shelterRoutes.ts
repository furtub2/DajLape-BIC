import express from 'express';
import { authorizeRoles } from '../middlewares/roleMiddleware';
import {createOffer, getShelterOffers, updateOffer} from '../controllers/shelterController';

const router = express.Router();

router.post('/createOffer', authorizeRoles('SHELTER'), createOffer);

router.post('/updateOffer', authorizeRoles('SHELTER'), updateOffer);

router.get('/getShelterOffers', authorizeRoles('SHELTER'), getShelterOffers);


export default router;
