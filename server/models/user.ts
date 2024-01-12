import {Schema, model, InferSchemaType} from 'mongoose';

const userSchema = new Schema({
    username: {type: String, required: true},
    email: String,
    password: {type: String, required: true}
},{collection: 'Users'})

export type UserType = InferSchemaType<typeof userSchema>
export const StudentSchema = model('Users',  userSchema)