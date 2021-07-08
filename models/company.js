const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    companyLocation: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    yearEstablished: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Company', companySchema);