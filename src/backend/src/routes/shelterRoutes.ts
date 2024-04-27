import express from 'express';
import { authorizeRoles } from '../middlewares/roleMiddleware';
import {createOffer, updateOffer} from '../controlllers/shelterController';

const router = express.Router();

router.post('/createOffer', authorizeRoles('shelter'), createOffer);

router.post('/updateOffer', authorizeRoles('shelter'), updateOffer);


export default router;
