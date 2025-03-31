const Deposit = require('../model/Deposit.model'); //  ใช้ตัวพิมพ์ใหญ่สำหรับ Model

exports.createDeposit = async (req, res) => {
  try {
    const {
      date,
      time,
      bank,
      accountName,
      accountNumber,
      amount,
      image,
      projectId,
      remark
    } = req.body;

    //  ตรวจสอบข้อมูลที่จำเป็น
    if (!date || !time || !bank || !accountName || !accountNumber || !amount ) {
      return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
    }

    //  สร้างเอกสารฝากเงินใหม่
    const newDeposit = new Deposit({
      date,
      time,
      bank,
      accountName,
      accountNumber,
      amount,
      image,
      projectId,
      remark
    });

    await newDeposit.save();

    return res.status(201).json({
      message: 'บันทึกข้อมูลการฝากเงินสำเร็จ',
      deposit: newDeposit
    });

  } catch (error) {
    console.error('Deposit Error:', error);
    return res.status(500).json({
      message: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์',
      error: error.message
    });
  }
};
