import express from 'express';
import { createUser, createOffer} from '../controlllers/adminController';
//import { verifyToken, isAdmin } from '../middlewares/authMiddleware'; 

const router = express.Router();

router.post('/users', /*verifyToken, isAdmin,*/ createUser);

router.post('/offers', /*authenticate, authorize('admin'),*/ createOffer);


export default router;
