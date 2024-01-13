import mongoose from 'mongoose'
import { Company, CompanyType } from '../models/company'

require('dotenv').config()

export default async function getCompanies(req: { body: { token: any } }, res) {
    await mongoose.connect(process.env.MONGODB_URI_USERS).then(async () => {

        await Company.findOne({}).then((resp: CompanyType) => {
            console.log(resp)
           
            mongoose.connection.close()
        }).catch(err => { 
            console.log(err); 
            res.status(404).send({ message: 'Could not retrieve companies' });
            mongoose.connection.close()
        })
        
    })

}