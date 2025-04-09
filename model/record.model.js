const mongoose = require("mongoose");
const Schema = mongoose.Schema
const Joi = require("joi");
// const AutoIncrement = require('mongoose-sequence')(mongoose);

const recordSchema = new Schema({
  userid:{ type: String, required: false },
  record_type: { type: String, required: false },
  header: { type: String, required: false },
  startDate: { type: String, required: false },
  endDate: { type: String, required: false },
  dayCount: { type: String, default:  false },
  file_record: { type: String, default:  false },
  description: { type: String, required: false },
}, { timestamps: true }) //  ปิดวงเล็บ schema ถูกต้อง

//  สร้างโมเดล
const record = mongoose.model("record", recordSchema)

module.exports = { record }

