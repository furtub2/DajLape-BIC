import express from 'express';
import {getAllOffers, getLastFourOffers, getSpecificOffer} from '../controlllers/userControlller';

const router = express.Router();

router.get('/getLastFourOffers', getLastFourOffers);

router.get('/getSpecificOffer', getSpecificOffer);

router.get('/getAllOffers', getAllOffers);


export default router;
