import mongoose from 'mongoose'
import { Product, ProductType } from '../models/product'

require('dotenv').config()

export async function addProduct(req, res) {
    await mongoose.connect(process.env.MONGODB_URI).then(async () => {
        console.log('first')
        const productData = req.body
        console.log(productData)
        const newProduct = new Product({
            name: productData.name,
            producedBy: productData.producedBy,
            producedId: productData.producedId,
            sector: productData.sector,
            price: productData.price,
            amountUnit: productData.amountUnit,
            createdAt: Date.now(),
            updatedAt: Date.now()
        })
        const savedProduct = await newProduct.save();
        res.status(201).send({ message: 'Product registered successfully', productId: savedProduct._id })

        mongoose.connection.close();

    }).catch((err) => { console.log(err); res.status(500).send({ message: 'Internal error' }) })

}
export async function getProducts(req, res) {
    await mongoose.connect(process.env.MONGODB_URI).then(async () => {

        await Product.find({}).then((product) => {
            res.status(200).send(product)
            mongoose.connection.close()
        }).catch(err => {
            console.log(err);
            res.status(404).send({ message: 'Could not retrieve products' });
            mongoose.connection.close()
        })

    }).catch((err) => { console.log(err); res.status(500).send({ message: 'Internal error' }) })

}
export async function deleteProduct(req, res) {
    await mongoose.connect(process.env.MONGODB_URI).then(async () => {

        const { id } = req.body

        await Product.deleteOne({ "_id": id }).then((resp) => {
            console.log(resp);
            res.status(200).send({ message: 'Product deleted successfully' })
        }).catch((err) => { console.log(err); res.status(404).send({ message: err }) })

        mongoose.connection.close();


    }).catch((err) => { console.log(err); res.status(500).send({ message: 'Internal error' }) })

}