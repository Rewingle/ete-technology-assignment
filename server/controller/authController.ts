import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import { UserType } from '../models/user'
import jwt from 'jsonwebtoken'
import { User } from '../models/user'

require('dotenv').config()

exports.loginUser = async(req: { body: UserType }, res) => {

    const { username, password } = req.body

    await mongoose.connect(process.env.MONGODB_URI_USERS).then(async () => {

        /* Find user with given username */
        const user = await User.findOne({ username })

        /* Return error if username not exist in db */
        if (!user) return res.status(404).send({ message: "Invalid username or password." })

        /* Compare the password with the password from db */
        const validPassword = await bcrypt.compare(password, user.password);

        /* If passwords are not matched for given user return error */
        if (!validPassword) {
            return res.status(404).send({ message: "Invalid username or password." })
        }
        /* Create the JWT Token */
        const token = jwt.sign({ userId: user.id, username: user.username, email: user.email }, process.env.JWT_SECRET)

        res.status(200).send({ token })
        mongoose.connection.close()

    }).catch((err) => { console.log(err); return res.status(500).send({ message: "Internal server error" }) })
}

exports.registerUser = (req: { body: UserType }, res) => {
    const { username, email, password } = req.body
    mongoose.connect(process.env.MONGODB_URI_USERS).then(async () => {

        /* Check if username or email already exist in db */
        const existingUsername = await User.findOne({ username });
        const existingEmail = await User.findOne({ email });

        if (existingUsername && existingEmail) {
            return res.status(404).send({ message: "User already exists." })
        }
        else if (existingUsername) {
            return res.status(404).send({ message: "Username already exists." })
        }
        else if (existingEmail) {
            return res.status(404).send({ message: "Email has already used." })
        }
        /* If the credentials are unique: */
        /* Encrypt password */
        const salt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(password, salt);
        /* Create an instance of a user */
        const user = new User({
            username,
            email,
            password: hashedPassword,
            createdAt: Date.now(),
            updatedAt: Date.now()
        })
        /* Save user to database */
        const savedUser = await user.save();

        res.status(201).send({ message: 'User registered successfully', userId: savedUser._id })

        mongoose.connection.close()
    }).catch((err) => { console.log(err); return res.status(500).send({ message: "Internal server error" }) })


}