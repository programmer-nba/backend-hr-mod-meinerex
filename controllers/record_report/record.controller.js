const { Employees } = require("../../model/employee/employee");
const { recordReport } = require("../../model/record.model");
const mongoose = require('mongoose');

const { record } = require('../../model/record.model') // import model

//  CREATE - เพิ่มข้อมูล
const create = async (req, res) => {
  try {
    const newRecord = await record.create(req.body)
    console.log(newRecord)
    res.status(201).json({ status: true, message: 'สร้างรายการสำเร็จ', data: newRecord })
  } catch (err) {
    console.error(err)
    res.status(500).json({ status: false, message: 'เกิดข้อผิดพลาดในการสร้างข้อมูล' })
  }
}

// READ - ดึงข้อมูลทั้งหมด
const getAll = async (req, res) => {
  try {
    const records = await record.find().sort({ createdAt: -1 })
    res.status(200).json({ status: true, data: records })
  } catch (err) {
    res.status(500).json({ status: false, message: 'เกิดข้อผิดพลาดในการดึงข้อมูล' })
  }
}

// READ - ดึงข้อมูลตาม ID
const getByUserId = async (req, res) => {
  try {
    const data = await record.find({ user_id: req.params.id })
    if (!data.length) {
      return res.status(404).json({ status: false, message: 'ไม่พบข้อมูลที่ต้องการ' })
    }

    res.status(200).json({ status: true, data })
  } catch (err) {
    res.status(500).json({ status: false, message: 'เกิดข้อผิดพลาดในการค้นหา' })
  }
}



//  UPDATE - แก้ไขข้อมูล
const update = async (req, res) => {
  try {
    const updated = await record.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updated) return res.status(404).json({ status: false, message: 'ไม่พบข้อมูลที่จะแก้ไข' })

    res.status(200).json({ status: true, message: 'อัปเดตข้อมูลสำเร็จ', data: updated })
  } catch (err) {
    res.status(500).json({ status: false, message: 'เกิดข้อผิดพลาดในการอัปเดตข้อมูล' })
  }
}

//  DELETE - ลบข้อมูล
const remove = async (req, res) => {
  try {
    const deleted = await record.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ status: false, message: 'ไม่พบข้อมูลที่ต้องการลบ' })

    res.status(200).json({ status: true, message: 'ลบข้อมูลสำเร็จ' })
  } catch (err) {
    res.status(500).json({ status: false, message: 'เกิดข้อผิดพลาดในการลบข้อมูล' })
  }
}

module.exports = { create, getAll, getByUserId, update, remove}


