import express from 'express';
import * as adminController from '../controlllers/adminController';
//import { verifyToken, isAdmin } from '../middlewares/authMiddleware'; 

const router = express.Router();

router.post('/createUser', /*verifyToken, isAdmin,*/ adminController.createUser);

router.post('/createOffer', /*authenticate, authorize('admin'),*/ adminController.createOffer);

router.get('/getAllUsers', /*verifyToken, isAdmin,*/ adminController.getAllUsers);

router.get('/getAllOffers', /*verifyToken, isAdmin,*/ adminController.getAllOffers);

router.delete('/deleteSpecificUser', adminController.deleteSpecificUser);

router.delete('/deleteSpecificOffer', adminController.deleteSpecificOffer);

export default router;
