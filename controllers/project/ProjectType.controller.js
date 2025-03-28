const Type = require('../../model/project/ProjectType.model');

// เพิ่มประเภทงานใหม่
exports.createType = async (req, res) => {
try {
    const { name , code, roles} = req.body
    const newType = new Type({ 
        name : name,
        code : code,
        roles: roles
    });
    const savedType = await newType.save()
    if (!savedType) return res.json({
        message: "can not create new-type"
    })
    return res.status(201).json({
        message: 'success!',
        status: true,
        data : newType
    });
} catch (error) {
    res.status(500).json({ message: error.message })
    }
}

// แก้ไขข้อมูลประเภทงาน
exports.updateType = async (req, res) => {
    try {
        const newType = await Type.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name,
                code: req.body.code,
                roles: req.body.roles
            }
        }, { new : true })
        return res.json({
            message: 'success!',
            status: true,
            data: newType
        })
    }
    catch (err) {
        console.log(err)
        return res.json({
            message: err.message
        })
    }
}

// ลบประเภทงาน
exports.deleteType = async (req, res) => {
    try {
        const deletedType = await Type.findByIdAndDelete(req.params.id)
        if (!deletedType) return res.json({
            message: 'can not delete this type'
        })
        return res.json({
            message: 'Delete  Type successfully!',
            status: true,
            data: deletedType.deletedCount
        })
    } catch (err) {
        console.log(err)
        return res.json({
            message: err.message
        })
    }
}

// ดึงข้อมูลประเภทงานทั้งหมด
exports.getTypes = async (req, res) => {
    try {
        const types = await Type.find()
        return res.status(200).json({
            message : 'success!',
            status : true, 
            data : types 
        })
    } catch (error) {
        return res.status(500).json({ 
            message : err.message,
        })
    }
}