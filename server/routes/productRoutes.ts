import express from 'express'
const productController = require('../controller/productController')

const router = express.Router();

router.post('/addProduct', productController.addProduct)
router.post('/deleteProduct', productController.deleteProduct)
router.get('/products', productController.getProducts)

export default router