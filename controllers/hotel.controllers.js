const Joi = require('joi')
const { checkCustomer, createCustomer } = require('../models/query')

const findCustomer = (req, res) => {
    const schema = Joi.object({
        phone: Joi.string().min(11).required()
    })
    
    try{
        const { error, value } = schema.validate(req.params)
        if (error != undefined) throw new Error(error.details[0].message)

        const { phone } = req.params
        const email = phone
        checkCustomer(email, phone)
        .then(customerResult => {
            res.status(200).json({
                status:true,
                message: customerResult
            })
        })
        .catch(error => {
            res.status(400).json({
                status:false,
                message: error.message
            })
        })

    } catch(e){
        res.status(404).json({
            status:false,
            message: error.message
        })
    }
}

const newCustomer = (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        phone: Joi.string().min(11).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
    })

    try{
        const { error, value } = schema.validate(req.body)
        if (error != undefined) throw new Error(error.details[0].message)
      
        const { name, phone, email } = req.body

        checkCustomer(email, phone)
        .then(checkResponse => {
            if (checkResponse.length > 0) throw new Error(`Customer already exists`)
            return createCustomer(name, phone, email)
        })
        .then(customerResult => {
            res.status(201).json({
                status:true,
                message: "Customer succefully created"
            })
        })
        .catch(error => {
            res.status(400).json({
                status:false,
                message: error.message
            })
        })

    }catch(error) {
        res.status(400).json({
            status:false,
            message: error.message
        })
    }
}

module.exports = { newCustomer, findCustomer }