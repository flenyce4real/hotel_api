const connection = require('./connection')
const { v4 : uuidv4 } = require('uuid')

const checkCustomer = (email, phone) => {
    return  new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM customers WHERE email='${email}' or phone='${phone}'`,
            (err, results, fields) => {
            if (err) reject(err)
            resolve(results)
        })
    })
}

const createCustomer = (name, phone, email) => {
    return  new Promise((resolve, reject) => {
        connection.query(`INSERT INTO customers(customer_id, name, phone, email)
        VALUES('${uuidv4()}','${name}','${phone}','${email}')`,
        (err, results, fields) =>  {
            if (err) reject(err)
            resolve(results)
        })
   })
}

const createBooking = (customer_id, room_id, stay_length) => {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO bookings(booking_id, customer_id, room_id, stay_length)
        VALUES('${uuidv4()}','${customer_id}','${room_id}','${stay_length}')`,
        (err, results, fields) =>  {
            if (err) reject(err)
            resolve(results)
        })
    })
}

const fetchBookings = () => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM bookings`,
            (err, results, fields) => {
            if (err) reject(err)
            resolve(results)
        })
    })
}

const refno2roomid = (refno) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT room_id FROM rooms where refno = ${refno}`,
            (err, results, fields) => {
            if (err) reject(err)
            resolve(results)
        })
    })
}

const createRoom = (type, price) => {
    const room_id = uuidv4()
    const refno = room_id.split('-')[0]
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO rooms(room_id, refno, type, price)
        VALUES('${room_id}','${refno}','${type}','${price}')`,
        (err, results, fields) =>  {
            if (err) reject(err)
            resolve(results)
        })
    })
}

const checkRoom = (type, price) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM rooms WHERE type = '${type}' and price = '${price}'`,
            (err, results, fields) => {
            if (err) reject(err)
            resolve(results)
        })
    })
}

const checkRoomStatus = (refno) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM rooms WHERE refno = '${refno}'`,
            (err, results, fields) => {
            if (err) reject(err)
            resolve(results)
        })
    })
}

module.exports = { createCustomer, checkCustomer, fetchBookings, createBooking, refno2roomid, createRoom, checkRoom, checkRoomStatus }