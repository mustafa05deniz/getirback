const mongoose = require('mongoose')
const Schema = new mongoose.Schema({
    key: {
        type: String,
    },
    createdAt: {
        type: Date
    },
    counts: {
        type: Number
    },
    value: {
        type: String
    }
})
module.exports = mongoose.model('record', Schema)