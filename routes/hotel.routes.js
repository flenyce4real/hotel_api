const express = require('express')
const router = express.Router()
const { newCustomer, findCustomer, viewBookings, newBookings, addRoom, roomStatus } = require('../controllers/hotel.controllers')

router.get('/customer/:phone', findCustomer)
router.post('/customer/new', newCustomer)
router.get('/bookings', viewBookings)
router.post('/booking/new', newBookings)
router.post('/room/addnew', addRoom)
router.get('/room/:refnoid', roomStatus)

module.exports = router