import mongoose from 'mongoose'
import { Company, CompanyType } from '../models/company'

require('dotenv').config()

export async function getCompanies(req, res) {
    await mongoose.connect(process.env.MONGODB_URI).then(async () => {

        await Company.find({}).then((companies) => {
            res.status(200).send(companies)
            mongoose.connection.close()
        }).catch(err => {
            console.log(err);
            res.status(404).send({ message: 'Could not retrieve companies' });
            mongoose.connection.close()
        })

    })

}
export async function addCompany(req, res) {
    await mongoose.connect(process.env.MONGODB_URI).then(async () => {

        const { name, companyLegalNumber, incorporationCountry, website, sector, numberOfEmployees, revenue, phone } = req.body

        const newCompany = new Company({
            name,
            companyLegalNumber,
            incorporationCountry,
            website,
            sector,
            numberOfEmployees,
            revenue,
            phone,
            createdAt: Date.now(),
            updatedAt: Date.now()
        })
        const savedCompany = await newCompany.save();

        res.status(201).send({ message: 'Company registered successfully', companyId: savedCompany._id })
        mongoose.connection.close();


    }).catch((err) => { console.log(err); res.status(500).send({ message: 'Internal error' }) })

}
export async function getReport(req, res) {
    await mongoose.connect(process.env.MONGODB_URI).then(async () => {
        let lastCompany = await Company.find({}).sort({ _id: -1 }).limit(1)
        let countCompanies = await Company.countDocuments({})
        const aggregatorOpts = [{
            $unwind: "$sector"
        },
        {
            $group: {
                value: { $sum: 1 },
                _id: "$sector"

            },

        }, {
            $project: {
                "_id": 0,
                "value": "$value",
                "label": "$_id"

            }
        }
        ]
        let pieChartData = await Company.aggregate(aggregatorOpts).exec();
        let highestRevenue = await Company.find().sort({ "revenue": -1 }).limit(1);
        res.status(200).send({ lastCompany: lastCompany, count: countCompanies, pie: pieChartData, highestRevenue: highestRevenue })
        mongoose.connection.close()
    }).catch((err) => { console.log(err); res.status(500).send({ message: 'Internal error' }) })
}