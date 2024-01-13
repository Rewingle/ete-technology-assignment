import express from 'express';
import cors from 'cors'

import authRoutes from './routes/authRoutes'
import userRoutes from './routes/userRoutes'
 
const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors())


app.use('/api',authRoutes,userRoutes)

app.listen(5000)