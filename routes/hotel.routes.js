const express = require('express')
const router = express.Router()
const { newCustomer, findCustomer, viewBookings, newBookings } = require('../controllers/hotel.controllers')

router.get('/customer/:phone', findCustomer)
router.post('/customer/new', newCustomer)
router.get('/bookings', viewBookings)
router.post('/new/booking', newBookings)

module.exports = router