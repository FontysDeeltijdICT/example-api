"use strict"

const express = require('express')
const cors = require('cors')
const app = express()

const port = 8080

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

const mongoose = require('mongoose')

mongoose.connect('mongodb://mongo/example-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to DB')
}).catch(err => {
    console.log('Error connecting to DB', err)
    process.exit()
})

const beerRouter = require('./app/routes/beers')

app.use('/', beerRouter)

app.listen(port, () => {
    console.log(`Example app listening at port ${port}`)
})
