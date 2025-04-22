const { salary } = require('../../model/Salary/salary.model')

const create = async (req, res) => {
    try {
        const { accountNumber, bank, amount } = req.body
        const newSalary = await salary.create({ accountNumber, bank, amount })
        res.status(201).json({ status: true, message: 'สร้างรายการสำเร็จ', data: newSalary })
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ status: false, message: 'เกิดข้อผิดพลาดในการสร้างข้อมูล' })
    }
  }

  module.exports = {create}
