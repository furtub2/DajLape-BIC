import express from 'express'

const router = express.Router()
// middleware
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
next() })

// home page route
router.get('/', (req, res) => {
    res.send('Simple Home Page - Server is working')
})

export default router