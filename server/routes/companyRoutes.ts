import express from 'express'
const companyController = require('../controller/companyController')

const router = express.Router();

router.get('/companies', companyController.getCompanies)
router.post('/addCompany', companyController.addCompany)
router.post('/deleteCompany', companyController.deleteCompany)
router.get('/getReport',companyController.getReport)

export default router