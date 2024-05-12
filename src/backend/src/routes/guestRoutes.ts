import express from 'express';
import { getAllOffers, getSpecificOffer } from '../controllers/guestController';

const router = express.Router();

router.get('/getAllOffers', getAllOffers);
router.get('/getSpecificOffer',getSpecificOffer)

export default router;