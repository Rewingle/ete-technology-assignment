import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import { User } from '../models/user'

require('dotenv').config()

exports.getUserInfo = async (req: any, res) => {
    /* await mongoose.connect(process.env.MONGODB_URI_USERS).then(async () => {
        const userId = jwt.verify(req.body.token, process.env.JWT_SECRET)
        const user = await User.findOne({})
    }) */
    console.log(req.cookies)
    res.send({message:'off'})
}