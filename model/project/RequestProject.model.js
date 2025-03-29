const mongoose = require('mongoose');

const RequestProjectSchema = new mongoose.Schema(
  {
    code: { type: String, required: false, default: "DWG" }, // TSG
    title: { type: String, required: false, default: "" },
    projectType: { type: String, required: false, default: "" },
    projectSubType: { type: String, required: false, default: "" },
    detail: { type: String, required: false, default: "" }, // require

    startDate: { type: String, required: false },
    endDate: { type: String, required: false, default: "" },

    refs: { type: Array, required: false, default: [] },
    qty: { type: Number, required: false, default: 1 },
    unit: { type: String, required: false, default: "งาน" },
    billNo: { type: String, required: false, default: "" },
    remark: { type: String, required: false, default: "" }, //หมายเหตุ
    customer: {
      customer_iden: { type: String, required: false, default: "" },
      customer_name: { type: String, required: false, default: "" },
      customerType: { type: String, required: false, default: "" },
      customer_tel: { type: String, required: false, default: "" },
      customer_line: { type: String, required: false, default: "" },
      customer_address: { type: String, required: false, default: "" },
    },
    sendAddress: { type: String, required: false, default: "" },
    status: { type: Array, required: false, default: [] },
    permisses: { type: Array, required: false, default: [] },
    employees: { type: Array, required: false, default: [] },
    timestamps: { type: Date, required: false, default: Date.now() },

    img_surway: { type: String, required: false, default: "" },
    img_process: { type: String, required: false, default: "" },
    img_testing: { type: String, required: false, default: "" },
    img_deliverwork: { type: String, required: false, default: "" },

    location: { type: String, required: false, default: "" },

    //ที่อยู่
    address: { type: String, required: false, default: "" }, // ที่อยู่
    subdistrict: { type: String, required: false, default: "" },
    district: { type: String, required: false, default: "" },
    province: { type: String, required: false, default: "" },
    postcode: { type: String, required: false, default: "" },
  },
  { timestamps: true }
);

const RequestProject = mongoose.model(
  "RequestProject",
  RequestProjectSchema
);

module.exports = RequestProject;