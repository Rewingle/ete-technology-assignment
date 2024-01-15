import { Schema, model, InferSchemaType } from 'mongoose';

const Sectors = ['Clothing', 'Technology', 'Industry', 'Education', 'Foods']

const productSchema = new Schema({
    name: { type: String, required: true },
    producedBy: {type: String, required: true},
    producedId: { type: Schema.Types.ObjectId, ref: 'Companies', required: true },
    sector: { type: String, required: true, enum: Sectors },
    price: {type: Number, required: true},
    amountUnit: {type: Number, required: true},
    createdAt: Date,
    updatedAt: Date
}, { collection: 'Products' })

export type ProductType = InferSchemaType<typeof productSchema>
export const Product = model('Products', productSchema)