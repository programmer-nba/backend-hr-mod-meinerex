const { recordType } = require('../../model/recordType/record_type');
const mongoose = require('mongoose');

create = async (req, res)=>{
    try{
        const find = await recordType.findOne({
            $or:[
                { type_name: req.body.type_name },
                { type_number: req.body.type_number }
            ]
        })
            if (find) {
                let message = "พบข้อมูลที่ซ้ำในระบบ: ";
                if (find.type_name === req.body.type_name) {
                    message += `ประเภทข้อความ (${req.body.type_name}) `;
                }
                if (find.type_number === req.body.type_number) {
                    message += `หมายเลขข้อความ (${req.body.type_number}) `;
                }
            
                return res
                        .status(400)
                        .send({ status: false, message: message });
            }
        const record = await recordType.create(req.body)
            if(!record){
                return res
                        .status(200)
                        .send({status: true, message: "ไม่สามารถสร้างประเภทบันทึกข้อความได้"})
            }
        return res
                .status(200)
                .send({status:true, data:record})
    }catch(err){
        return res  
                .status(500)
                .send({status:false, message:err.message})
    }
}

getbyid = async (req, res) => {
    try {
        const id = req.params.id; // สมมติว่าคุณใช้ parameter ในการระบุ user_id
        const get = await recordType.findById(id);
        if (get) {
            return res
                .status(200)
                .send({ status: true, data: get });
        } else {
            return res
                .status(400)
                .send({ status: false, message: "ไม่สามารถเรียกดูข้อมูลได้" });
        }
    } catch (err) {
        return res
            .status(500)
            .send({ status: false, message: "มีบางอย่างผิดพลาด" });
    }
}

getAll = async (req, res)=>{
    try{
        const get = await recordType.find()
        if(get){
            return res 
                    .status(200)
                    .send({status: true, data:get})
        }else{
            return res
                    .status(400)
                    .send({status: false, message:"ไม่สามารถเรียกดูข้อมูลได้"})
        }
    }catch(err){
        return res  
                .status(500)
                .send({status:false, message:"มีบางอย่างผิดพลาด"})
    }
}

delend = async (req, res)=>{
    try{
        const id = req.params.id
        const del = await recordType.findByIdAndDelete(id)
        if(del){
            return res
                    .status(200)
                    .send({status:false, message:"ทำการลบบันทึกแล้ว"})
        }else{
            return res
                    .status(400)
                    .send({status:true, message:"ไม่มีบันทึกที่ท่านต้องการลบ"})
        }
    }catch(err){
        return res  
                .status(500)
                .send({status:false, message:"มีบางอย่างผิดพลาด"})
    }
}

update = async (req, res)=>{
    try{
        const id = req.params.id
        const update = await recordType.findByIdAndUpdate(id,req.body, {new:true})
        if(update){
            return res
                    .status(200)
                    .send({status:true, data:update})
        }else{
            return res
                    .status(400)
                    .send({status:false, message:"ไม่สามารถอัพเดทได้"})
        }
    }catch(err){
        return res 
                .status(500)
                .send({status:false, message:"มีบางอย่างผิดพลาด"})
    }
}

module.exports = { create, getAll, delend, update, getbyid}