import express from 'express';
import { createUser } from '../controlllers/adminController';
//import { verifyToken, isAdmin } from '../middlewares/authMiddleware'; 

const router = express.Router();

router.post('/users', /*verifyToken, isAdmin,*/ createUser);

export default router;
