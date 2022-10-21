const express = require('express')
const router = express.Router()
const { newCustomer, findCustomer } = require('../controllers/hotel.controllers')

router.get('/customer/:phone', findCustomer)
router.post('/customer/new', newCustomer)
//router.get('/bookings', viewBookings)
//router.post('/book', )

module.exports = router