import express from 'express';
import { createUser, createOffer, getAllUsers, getAllOffers} from '../controlllers/adminController';
//import { verifyToken, isAdmin } from '../middlewares/authMiddleware'; 

const router = express.Router();

router.post('/users', /*verifyToken, isAdmin,*/ createUser);

router.post('/offers', /*authenticate, authorize('admin'),*/ createOffer);

router.get('/getAllUsers', /*verifyToken, isAdmin,*/ getAllUsers);

router.get('/getAllOffers', /*verifyToken, isAdmin,*/ getAllOffers);

export default router;
