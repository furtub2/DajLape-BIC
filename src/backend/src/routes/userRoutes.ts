import express from 'express';
import {getAllOffers, getFilteredOffers, getLastFourOffers, getSpecificOffer} from '../controlllers/userControlller';

const router = express.Router();

router.get('/getLastFourOffers', getLastFourOffers);

router.get('/getSpecificOffer', getSpecificOffer);

router.get('/getAllOffers', getAllOffers);

router.get('/getFilteredOffers', getFilteredOffers);


export default router;
