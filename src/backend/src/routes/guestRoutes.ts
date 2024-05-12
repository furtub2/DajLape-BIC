import express from 'express';
import { getAllOffers, getShelterInfo, getSpecificOffer } from '../controllers/guestController';

const router = express.Router();

router.get('/getAllOffers', getAllOffers);
router.get('/getSpecificOffer',getSpecificOffer);
router.get('/getShelterInfo',getShelterInfo);

export default router;