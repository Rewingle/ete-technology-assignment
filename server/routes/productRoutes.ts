import express from 'express'
const productController = require('../controller/productController')

const router = express.Router();

router.post('/addProduct', productController.addProduct)
router.get('/products', productController.getProducts)

export default router