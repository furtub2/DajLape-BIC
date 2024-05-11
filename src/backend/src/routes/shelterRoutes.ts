import express from 'express';
import { authorizeRoles } from '../middlewares/roleMiddleware';
import {createOffer, updateOffer} from '../controllers/shelterController';

const router = express.Router();

router.post('/createOffer', authorizeRoles('SHELTER'), createOffer);

router.post('/updateOffer', authorizeRoles('SHELTER'), updateOffer);


export default router;
