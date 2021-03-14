const mongoose = require('mongoose')
const Schema = mongoose.Schema

const beerSchema = new Schema({
    name: String,
    percentage: {
        type: Number,
        min: 0,
        max: 100
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Beer', beerSchema)
