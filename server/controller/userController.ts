import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import { User, UserType } from '../models/user'

require('dotenv').config()

export default async function getUserInfo(req: { body: { token: any } }, res) {
    await mongoose.connect(process.env.MONGODB_URI).then(async () => {

        const token = req.body.token
        const _user = jwt.verify(token, process.env.JWT_SECRET)
        console.log(_user)
        await User.findOne({ _id: _user.userId }).then((resp: UserType) => {
            console.log(resp)
            res.status(200).send({ username: resp.username })
            mongoose.connection.close()
        }).catch(err => { 
            console.log(err); 
            res.status(404).send({ message: 'Could not retrieve userInfo' });
            mongoose.connection.close()
        })
        
    })

}