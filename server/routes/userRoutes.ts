import express from 'express'
import userController from '../controller/userController'

const router = express.Router();

router.post('getUserInfo',userController.getUserInfo)

export default router