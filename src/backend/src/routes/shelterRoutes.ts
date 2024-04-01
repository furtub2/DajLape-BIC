import express from 'express';
import {createOffer, updateOffer} from '../controlllers/shelterController';

const router = express.Router();

router.post('/createOffer', createOffer);

router.post('/updateOffer', updateOffer);


export default router;
