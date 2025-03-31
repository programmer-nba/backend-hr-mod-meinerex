const mongoose = require('mongoose');

const timeInOutSchema = new mongoose.Schema({
    projectId: { type: String, required: false },
    projectCode: { type: String, required: false }, 
    employeeId: { type: String, required: false },
    location: { type: String, required: false },
    time: { type: String, required: false },
    type: { type: String, required: false },
}, { timestamps: true });

const timeInOut = mongoose.model("TimeInOut", timeInOutSchema);

module.exports = {timeInOut};