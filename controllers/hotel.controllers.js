const Joi = require('joi')
const { checkCustomer, createCustomer, createBooking, fetchBookings, createRoom, checkRoom, checkRoomStatus } = require('../models/query')

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
            if (customerResult.length < 1) {
                throw new Error('Customer does not exist')
            } else {
                res.status(200).json({
                    status:true,
                    message: customerResult
                })
            }
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
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }).required()
    })

    try {
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

    } catch(error) {
        res.status(400).json({
            status:false,
            message: error.message
        })
    }
}

const viewBookings = (req, res) => {
    try {
        fetchBookings()
        .then(checkResult => {
            if (checkResult.length < 1) {
                throw new Error('No booking record found')
            } else {
                res.status(201).json({
                    status:true,
                    message: checkResult
                })
            }
        })
        .catch(error => {
            res.status(400).json({
                status:false,
                message: error.message
            })
        })

    } catch (error) {
        res.status(400).json({
            status:false,
            message: error.message
        })
    }
}

const newBookings = (req, res) => {
    const schema = Joi.object({
        customer_id: Joi.string().min(36).required(),
        refno: Joi.string().min(8).required(),
        stay_length: Joi.number().required(),
        amount_paid: Joi.number().required()
    })

    try {
        const { error, value } = schema.validate(req.body)
        if (error != undefined) throw new Error(error.details[0].message)
      
        const { customer_id, refno, stay_length, amount_paid } = req.body

        refno2roomid(refno)
        .then(getRefno => {
            if (getRefno.length <= 0) {
                throw new Error(`Invalid Refno supplied`)
            }
            const room_id = getRefno[0].room_id
            return createCustomer(customer_id, room_id, stay_length) 
        })
        .then(customerResult => {
            res.status(201).json({
                status:true,
                message: "Room has been succefully booked"
            })
        })
        .catch(error => {
            res.status(400).json({
                status:false,
                message: error.message
            })
        })
        
    } catch (error) {
        res.status(400).json({
            status:false,
            message: error.message
        })
    }
}

const addRoom = (req, res) => {
    const schema = Joi.object({
        type: Joi.string().min(3).required(),
        price: Joi.number().required()
    })

    try {
        const { error, value } = schema.validate(req.body)
        if (error != undefined) throw new Error(error.details[0].message)
      
        const { type, price } = req.body

        checkRoom(type, price)
        .then(roomstatus => {
            if (roomstatus.length > 0) throw new Error(`${type} room already exists`)
            return createRoom(type, price)
        })
        .then(newRoom => {
            res.status(201).json({
                status:true,
                message: "New room added succefully"
            })
        })
        .catch(error => {
            res.status(400).json({
                status:false,
                message: error.message
            })
        })

    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            status:false,
            message: error.message
        })
    }
}

const roomStatus = (req, res) => {
    const schema = Joi.object({
        refnoid: Joi.string().min(8).required()
    })
    
    try{
        const { error, value } = schema.validate(req.params)
        if (error != undefined) throw new Error(error.details[0].message)
        const { refnoid } = req.params
        checkRoomStatus(refnoid)
        .then(roomresult => {
            if (roomresult.length < 1) {
                throw new Error('Room refno does not exist')
            } else {
                if (roomresult[0].status == 1){
                    throw new Error('This room is already booked')
                } else {
                    res.status(200).json({
                        status:true,
                        message: { refno, type, price } = roomresult[0] //inprogress
                    })
                }
            }
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
            message: e.message
        })
    }
}

module.exports = { newCustomer, findCustomer, viewBookings, newBookings, addRoom, checkRoom, roomStatus }