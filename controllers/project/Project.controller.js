const { default: axios } = require("axios");
const RequestProject = require("../../model/project/RequestProject.model");

const dayjs = require("dayjs");


exports.uploadWorkImages = async (req, res) => {
  try {
    const { id } = req.params;
    const { img_surway, img_process, img_testing, img_deliverwork } = req.body;

    console.log('id', id)

    const project = await RequestProject.findById(id);

    if (!project) {
      return res.status(404).json({ message: "ไม่พบโปรเจคที่ต้องการอัปเดต" });
    }

    project.img_surway = img_surway || project.img_surway;
    project.img_process = img_process || project.img_process;
    project.img_testing = img_testing || project.img_testing;
    project.img_deliverwork = img_deliverwork || project.img_deliverwork;

    await project.save();

    res.json({ message: "อัปเดตรูปภาพสำเร็จ", project });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการอัปเดตรูปภาพ:", error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในการอัปเดตรูปภาพ" });
  }
};


//Get Projects
exports.getProjects = async (req, res, next) => {
  try {
    const projects = await RequestProject.find();
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

//Insert a new Project
exports.createProject = async (req, res) => {
  try {
    const {
      code,
      title,
      projectType,
      remark,
      startDate,
      endDate,
      location,
      address,
      province,
      subdistrict,
      district,
      postcode,
    } = req.body;

    console.log("reqbody : ", req.body);

    const currentYearMonth = dayjs().format("YYYYMM");

    const lastProject = await RequestProject.findOne(
      { code: new RegExp(`^${code}${currentYearMonth}`) },
      {},
      { sort: { code: -1 } } 
    );

    let sequenceNumber = "000001"; 

    if (lastProject) {
      const lastSequence = parseInt(lastProject.code.slice(-6), 10);
      sequenceNumber = String(lastSequence + 1).padStart(6, "0");
    }

    const projectNumberString = `${projectType}${currentYearMonth}${sequenceNumber}`;

    const project = new RequestProject({
      code: projectNumberString,
      title: title,
      projectType: projectType,
      startDate: startDate,
      endDate: endDate,
      remark: remark,
      location: location,
      address: address,
      subdistrict: subdistrict,
      district: district,
      province: province,
      postcode: postcode,
      status: {
        name: "รอรับงาน",
        timestamp: dayjs().format(),
      },
    });

    const saved_project = await project.save();
    if (!saved_project) {
      return res.status(400).json({
        message: "ไม่สามารถบันทึกโครงการใหม่ได้",
      });
    }
    return res.status(200).json({
      message: "สร้างโครงการสำเร็จ!",
      status: true,
      data: saved_project,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.acceptProjectOffice = async (req, res) => {
  try {
    const id = req.params.id;
    const { employees } = req.body;
    const project = await RequestProject.findByIdAndUpdate(
      id,
      {
        $set: {
          employees: employees,
        },
        $push: {
          status: {
            name: "กำลังดำเนินการ",
            timestamp: dayjs(Date.now()).format(""),
          },
        },
      },
      { new: true }
    );
    if (!project) {
      return res.status(404).json({
        message: "not found",
      });
    }

    return res.status(201).json({
      message: "success",
      status: true,
      data: project,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.updateProjectOffice = async (req, res) => {
  try {
    const id = req.params.id;
    const project = await RequestProject.findByIdAndUpdate(
      id,
      {
        $push: {
          status: {
            name: req.body.status,
            timestamp: dayjs(Date.now()).format(""),
          },
        },
      },
      { new: true }
    );
    if (!project) {
      return res.status(404).json({
        message: "not found",
      });
    }

    return res.status(201).json({
      message: "success",
      status: true,
      data: project,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const id = req.params.id;
    const project = await RequestProject.findOne({ _id: id });

    if (!project) {
      return res
        .status(404)
        .json({ status: false, message: "Project not found" });
    }

    if (!project.status) project.status = [];
    if (!project.employees) project.employees = [];

    project.status.push({
      name: "กำลังดำเนินการ",
      timestamp: dayjs(Date.now()).format(""),
    });

    project.employees.push(req.body.employees);

    await project.save();

    console.log("✅ อัพเดทโปรเจคสำเร็จ");
    return res
      .status(200)
      .json({ status: true, message: "อัพเดทโปรเจคสำเร็จ", data: project });
  } catch (err) {
    console.error("❌ Server Error:", err);
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.acceptProject = async (req, res) => {
  try {
    const id = req.params.id;
    const project = await RequestProject.findOne({ _id: id });
    const resp = await axios.put(
      `${process.env.URL_TOSSAGUN}/order/service/submit/${project.billNo}`
    );
    if (resp.data.status) {
      const status = {
        name: "ดำเนินการสำเร็จ",
        timestamp: dayjs(Date.now()).format(""),
      };
      project.status.push(status);
      project.save();
      console.log("อัพเดทสถานะสำเร็จ");
      return res
        .status(200)
        .send({ status: true, message: "ยืนยันรับงานทำเสร็จ" });
    }
    if (!resp.response.data.staus) {
      return res
        .status(403)
        .send({ status: false, message: resp.response.data.message });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.getProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await RequestProject.findById(id).populate("employees");

    if (!project) {
      return res.status(404).json({
        message: "not found",
      });
    }

    return res.status(200).json({
      message: "success",
      status: true,
      data: project,
    });


  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await RequestProject.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({
        message: "can not delete project",
      });
    }
    return res.status(200).json({
      message: "success!",
      status: true,
      data: project.deletedCount,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.createProjectShop = async (req, res) => {
  try {
    const ProjectNumber = await GenerateProjectNumber();
    const data = {
      code: ProjectNumber,
      title: "งานจากทศกัณฐ์",
      projectType: "tossagun",
      detail: req.body.detail,
      customer: req.body.customer,
      refs: req.body.product_detail,
      billNo: req.body.receiptnumber,
      status: {
        name: "รอรับงาน",
        timestamp: dayjs(Date.now()).format(""),
      },
    };
    const new_project = new RequestProject(data);
    if (!new_project)
      return res
        .status(403)
        .send({ status: false, message: "ไม่สามารถเพิ่มงานในระบบได้" });
    new_project.save();
    return res
      .status(200)
      .send({ status: true, message: "เพิ่มงานในระบบสำเร็จ" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports.cancelProjectShop = async (req, res) => {
  try {
    const project = await RequestProject.findOne({ billNo: req.body.invoice });
    console.log(project);
    const status = {
      name: "งานถูกยกเลิก",
      timestamp: dayjs(Date.now()).format(""),
    };
    project.status.push(status);
    project.save();
    console.log("อัพเดทสถานะสำเร็จ");
    return res.status(200).send({ status: true, message: "ยกเลิกงานสำเร็จ" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

//invoice
exports.createInvoice = async (req, res) => {
  try {
    const {
      code,
      title,
      projectType,
      remark,
      startDate,
      endDate,
      location,
      address,
      province,
      subdistrict,
      district,
      postcode,
    } = req.body;

    console.log("reqbody : ", req.body);

    const project = new RequestProject({
      code: projectNumberString,

    });

    // บันทึกเอกสาร
    const saved_project = await project.save();
    if (!saved_project) {
      return res.status(400).json({
        message: "ไม่สามารถบันทึกโครงการใหม่ได้",
      });
    }
    return res.status(200).json({
      message: "สร้างโครงการสำเร็จ!",
      status: true,
      data: saved_project,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
};

async function GenerateProjectNumber() {
  const pipelint = [
    {
      $group: { _id: 0, count: { $sum: 1 } },
    },
  ];
  const count = await RequestProject.aggregate(pipelint);
  const countValue = count.length > 0 ? count[0].count + 1 : 1;
  const data = `DWG${dayjs(Date.now()).format("YYMMDD")}${countValue
    .toString()
    .padStart(3, "0")}`;
  return data;
}

