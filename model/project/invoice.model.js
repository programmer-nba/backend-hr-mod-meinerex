const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({

    title: { type : String, required : false},
    firstname: { type : String, required : false},
    lastname: { type : String, required : false},
    totalAmount: { type : Number, required : false},
    image: { type: String, required: false, default: "" },
    remark: { type: String, required: false, default: "" },
    projectId: { type: String, required: false, default: "" }, 
}, { timestamps: true });

const invoice = mongoose.model("invoices", InvoiceSchema)
module.exports = invoice