const invoice = require("../model/project/invoice.model");

exports.getInvoice = async (req, res, next) => {
    try {
        const projects = await invoice.find();
        return res.json({
            message: `have: ${projects.length}`,
            status: true,
            data: projects,
        });
    } catch (err) {
        console.log(err);
        return res.json({
            message: err.message,
        });
    }
};

exports.createInvoice = async (req, res, next) => {
    try {
        const { date, title, firstname, lastname, totalAmount, image,projectId,  remark } = req.body;
        console.log('reabody : ' , req.body)
        // ตรวจสอบข้อมูลที่จำเป็น
        if (!firstname || !lastname || !totalAmount) {
            return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
        }

        const newInvoice = new invoice({
            date,
            title,
            firstname,
            lastname,
            totalAmount,
            projectId,
            image,
            remark
        });

        await newInvoice.save();
        return res.status(201).json({ message: "บันทึกข้อมูลสำเร็จ", invoice: newInvoice });
    } catch (error) {
        return res.status(500).json({ message: "เกิดข้อผิดพลาด", error: error.message });
    }
}