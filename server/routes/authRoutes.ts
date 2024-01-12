import express from 'express'
const authController = require('../controller/authController')

const router = express.Router();

router.post('/login',authController.loginUser)
router.post('/register',authController.registerUser)

export default router