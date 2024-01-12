import { Schema, model, InferSchemaType } from 'mongoose';
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    username: { type: String, required: true },
    email: String,
    password: { type: String, required: true },
    createdAt: Date,
    updatedAt: Date
}, { collection: 'Users' })

userSchema.methods.verifyPassword = async function (password) {
    const user = this;
    const isMatch = await bcrypt.compare(password.user.password);
    return isMatch;
}

export type UserType = InferSchemaType<typeof userSchema>
export const User = model('Users', userSchema)