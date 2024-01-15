import express from 'express';
import cors from 'cors'

import authRoutes from './routes/authRoutes'
import userRoutes from './routes/userRoutes'
import companyRoutes from './routes/companyRoutes'
import productRoutes from './routes/productRoutes'
//import cookies from 'cookie-parser'

const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors())
//app.use(cookies())

app.use('/api', authRoutes, companyRoutes, productRoutes)

app.listen(5000)