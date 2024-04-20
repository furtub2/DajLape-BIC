import express from 'express';
import * as adminController from '../controlllers/adminController';
import { authorizeRoles } from '../middlewares/roleMiddleware'; 

const router = express.Router();

router.post('/createUser', authorizeRoles('admin'), adminController.createUser);

router.post('/createOffer', authorizeRoles('admin'), adminController.createOffer);

router.get('/getAllUsers', authorizeRoles('admin'), adminController.getAllUsers);

router.get('/getAllOffers', authorizeRoles('admin'), adminController.getAllOffers);

router.delete('/deleteSpecificUser', authorizeRoles('admin'), adminController.deleteSpecificUser);

router.delete('/deleteSpecificOffer', authorizeRoles('admin'), adminController.deleteSpecificOffer);

export default router;
