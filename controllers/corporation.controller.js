const { Employees } = require("../model/employee/employee");
const mongoose = require('mongoose');

const { corporation } = require('../model/corporation.model') // import model

//  CREATE - เพิ่มข้อมูล
const create = async (req, res) => {
  try {
    const newCorporation = await corporation.create(req.body)
    console.log(newCorporation)
    res.status(201).json({ status: true, message: 'สร้างรายการสำเร็จ', data: newCorporation })
  } catch (err) {
    console.error(err)
    res.status(500).json({ status: false, message: 'เกิดข้อผิดพลาดในการสร้างข้อมูล' })
  }
}

// READ - ดึงข้อมูลทั้งหมด
const getAll = async (req, res) => {
  try {
    const corporations = await corporation.find().sort({ createdAt: -1 })
    res.status(200).json({ status: true, data: corporations })
  } catch (err) {
    res.status(500).json({ status: false, message: 'เกิดข้อผิดพลาดในการดึงข้อมูล' })
  }
}

// READ - ดึงข้อมูลตาม ID
const getByUserId = async (req, res) => {
  try {
    const data = await corporation.find({ user_id: req.params.id })
    if (!data.length) {
      return res.status(404).json({ status: false, message: 'ไม่พบข้อมูลที่ต้องการ' })
    }

    res.status(200).json({ status: true, data })
  } catch (err) {
    res.status(500).json({ status: false, message: 'เกิดข้อผิดพลาดในการค้นหา' })
  }
}

module.exports = { create, getAll, getByUserId }


