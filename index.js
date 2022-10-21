require('dotenv').config()
const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const port = process.env.SERVER_PORT
const hotelRoute = require('./routes/hotel.routes')

app.use(bodyParser.json())
app.use(hotelRoute)

app.listen(port, () => {
    console.log(`Hotel_API engine is running on port ${port}`)
})