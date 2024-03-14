import express from 'express'
import adminRoutes from './adminRoutes'
import authRoutes from './authRoutes'

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

export default router