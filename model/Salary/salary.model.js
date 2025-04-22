const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
    accountNumber: {
        type: String,
        required: true,
    },
    bank: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const salary = mongoose.model('salary', salarySchema);

module.exports = { salary }