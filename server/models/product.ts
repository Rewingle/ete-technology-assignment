import { Schema, model, InferSchemaType } from 'mongoose';

const Sectors = ['Clothing', 'Technology', 'Industry', 'Education', 'Foods']

const companySchema = new Schema({
    name: { type: String, required: true },
    sector: { type: String, required: true, enum: Sectors },
    location: { type: String },
    founded: { type: Number },
    numberOfEmployees: { type: Number },
    revenue: { type: Number, required: true },
    phone: { type: String },
    createdAt: Date,
    updatedAt: Date
}, { collection: 'Companies' })

export type CompanyType = InferSchemaType<typeof companySchema>
export const Company = model('Companies', companySchema)