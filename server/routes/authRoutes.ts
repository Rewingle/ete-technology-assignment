import express from 'express'
import { UserType } from "../models/user";

const router = express.Router();

router.post('/login', (req:{body: UserType}, res) => {
    const data = req.body
    
    res.send({isAuth: true})
})

export default router