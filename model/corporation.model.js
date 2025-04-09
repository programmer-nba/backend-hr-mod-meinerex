const mongoose = require("mongoose");
const Schema = mongoose.Schema
const Joi = require("joi");


const corporationSchema = new Schema({
  company_name: { type: String, required: false },
  company_tax: { type: String, required: false },
  company_number: { type: String, required: false },
  company_tel: { type: String, required: false },
  company_mail: { type: String, default:  false },
  company_add: { type: String, default:  false },
}, { timestamps: true }) //  ปิดวงเล็บ schema ถูกต้อง

//  สร้างโมเดล
const corporation = mongoose.model("corporation", corporationSchema)

module.exports = { corporation }

