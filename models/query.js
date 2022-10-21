const connection = require('./connection')
const { v4 : uuidv4 } = require('uuid')

const checkCustomer = (email, phone) => {
    return  new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM customers where email='${email}' or phone='${phone}'`,
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

module.exports = { createCustomer, checkCustomer }