import express from 'express';
import cors from 'cors'

import authRoutes from './routes/authRoutes'
const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors())


app.use('/api',authRoutes)

app.listen(5000)