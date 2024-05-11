import express from 'express';
import { getAllOffers } from '../controllers/guestController';

const router = express.Router();

router.get('/getAllOffers', getAllOffers);

export default router;