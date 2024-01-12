var express = require('express')

//const login = require('../controller/')
const router = express.Router();

router.post('/login', (req, res) => {
    const data = req.body
    //const data = JSON.parse(JSON.stringify(req.body))
    console.log(data)
    res.send({isAuth: true})
})

export default router