const mongoose = require("mongoose");
const Schema = mongoose.Schema
const Joi = require("joi");
var bcrypt = require("bcrypt");

const EmployeeSchema = new Schema(
  {
    employee_number: { type: String, default: "", required: false },
    userid: { type: String, default: "", require: false },
    name_title: { type: String, require: false, default: "" },
    first_name: { type: String, require: false, default: "" },
    last_name: { type: String, require: false, default: "" },
    nick_name: { type: String, default: "", require: false },
    iden_number: { type: String, require: false },
    password: { type: String, default: "1", require: false },
    role: { type: String, require: false },
    //roles: { type: Array, require: false },
    role_id: String,
    permissions: { type: Array, default: [] },
    position: { type: String, require: false },
    tel: { type: String, default: "", require: false },
    address: { type: String, default: "", require: false },
    subdistrict: { type: String, default: "", require: false },
    district: { type: String, default: "", required: false },
    provice: { type: String, default: "", required: false },
    postcode: { type: String, default: "", required: false },
    birthday: { type: Date, default: null, required: false },
    age: { type: Number, default: 0, required: false },
    email: { type: String, default: "", required: false },
    blacklist: { type: Boolean, default: false, required: false },
    salary: { type: Number, default: 0, required: false },
    image: { type: String, required: false, default: "" },
    image_iden: { type: String, required: false, default: "" },
    image_bank: { type: String, required: false, default: "" },
    leave: {
      business_leave: { type: Number, default: 7, required: false }, //ลากิจ
      sick_leave: { type: Number, default: 30, required: false }, //ลาป่วย
      annual_leave: { type: Number, default: 4, required: false }, //ลาพักร้อน
      maternity_leave: { type: Number, default: 0, required: false }, //ลาดคลอด
      ordination_leave: { type: Number, default: 0, required: false }, //ลาบวช
      disbursement: { type: Number, default: 0, required: false }, //การเบิกจ่าย
    },
    massage_token: { type: String, required: false, default: "" },
  },
  { timestamps: true }
);

EmployeeSchema.pre('save',async function (next) {   //ทำ Middleware การ Hash ก่อน EmployeeScheme ที่ User กรอกมาจะ save
  try{
    const user = this
    const findNumber = await Employees.find();
    console.log(findNumber.length)
    const length = findNumber.length + 1;
      // console.log(findNumber)
    
    let data
      if (user.position == 'owner') {
        user.employee_number = 'OWNER';
        next();
      }else if(user.position == 'admin'){
        user.employee_number = 'ADMIN';
        next();
      } else {
        if (user.position == 'programmer') {
          data = 'DEV';
        } else if (user.position == 'graphic') {
          data = 'GRP';
        } else if (user.position == 'accounting') {
          data = 'ACC';
        } else if (user.position == 'manager') {
          data = 'MGR';
        } else if (user.position == 'marketting') {
          data = 'MKT';
        } else if (user.position == 'lawyer') {
          data = 'LAW';
        } else if (user.position == 'hr') {
          data = 'HR_';
        }
        if (findNumber.length == 0) {
          user.employee_number = data + String(length).padStart(6, '0');
        } else {
            const sortedEmployees = await findNumber.filter(employee => {
              // ถ้า employee_number เป็นตัวเลขสามารถแปลงเป็นตัวเลขได้ เราจะเก็บรายการนี้
              // console.log(employee)
                if (!isNaN(parseInt(employee.employee_number.substring(3), 10))) {
                    return true; // เก็บรายการที่เป็นตัวเลขเท่านั้น
                }
                return false; // กรองออกถ้าไม่สามารถแปลงเป็นตัวเลขได้
            }).sort((a, b) => {
                const numberA = parseInt(a.employee_number.substring(3), 10);
                const numberB = parseInt(b.employee_number.substring(3), 10);
                return numberB - numberA;
            });
            let number = 1;
              if (sortedEmployees.length > 0) {
                  number = parseInt(sortedEmployees[0].employee_number.substring(3), 10) + 1;
              }
            const stringNumber = String(number).padStart(6, '0');
            console.log(stringNumber);
            user.employee_number = data + stringNumber;
        }
        next();
      }
  }catch(err){
    console.error(err);
    next(err);
  }
  
})

const Employees = mongoose.model("employees", EmployeeSchema);

module.exports = { Employees};