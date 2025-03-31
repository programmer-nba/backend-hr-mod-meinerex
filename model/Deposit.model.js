const mongoose = require('mongoose');

const depositSchema = new mongoose.Schema({
  date: { type: String, required: false },
  time: { type: String, required: false },
  bank: { type: String, required: false },
  accountName: { type: String, required: false }, 
  accountNumber: { type: String, required: false, default: "" },
  amount: { type: String, required: false, default: "" },
  remark: { type: String, required: false, default: "" },
  projectId: { type: String, required: false, default: "" }
}, { timestamps: true });


const Deposit = mongoose.model("Deposit", depositSchema);
module.exports = Deposit;
