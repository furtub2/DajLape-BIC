import express from 'express'
import adminRoutes from './adminRoutes'
import authRoutes from './authRoutes'
import shelterRoutes from './shelterRoutes'
import userRoutes from './userRoutes'
import { validateToken } from '../middlewares/authMiddleware'

const router = express.Router()
// middleware
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
next() })

// home page route
router.get('/', (req, res) => {
    res.send('Simple Home Page - Server is working')
})

router.use('/admin', adminRoutes);

router.use('/auth', authRoutes);

router.use('/shelter', validateToken, shelterRoutes)

router.use('/user', validateToken, userRoutes)

export default router