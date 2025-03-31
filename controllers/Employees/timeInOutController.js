const { timeInOut } = require("../../model/employee/timeInOutEmployee");
const { Employees } = require("../../model/employee/employee")

exports.createLog = async (req, res, next) => {
  try {
    const { projectId, projectCode, employeeId, latitude, longitude, timeType } = req.body;

    console.log('reqbody : ' , req.body)

    if (!projectId || !employeeId || !latitude || !longitude) {
      return res.status(400).json({
        status: false,
        message: 'Missing required fields: projectId, employeeId, latitude, longitude'
      });
    }

    const now = new Date();
    const formattedTime = now.toLocaleTimeString('th-TH', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });

    const location = `${latitude},${longitude}`;

    const newTimeEntry = new timeInOut({
      projectId,
      projectCode,
      employeeId,
      location,
      time: formattedTime,
      type: timeType
    });

    await newTimeEntry.save();

    return res.status(201).json({
      status: true,
      message: 'บันทึกเวลาเรียบร้อย',
      data: newTimeEntry
    });
  } catch (error) {
    console.error('Error logging time:', error);
    return res.status(500).json({
      status: false,
      message: 'เกิดข้อผิดพลาดในการบันทึกเวลา',
      error: error.message
    });
  }
}

exports.getLogsByEmployeeId = async (req, res, next) => {
  try {
    const { employeeId } = req.params;

    if (!employeeId) {
      return res.status(400).json({
        status: false,
        message: "Missing required field: employeeId",
      });
    }

    const logs = await timeInOut.find({ employeeId }).sort({ createdAt: -1 });

    return res.status(200).json({
      status: true,
      message: "ดึงข้อมูลสำเร็จ",
      data: logs,
    });
  } catch (error) {
    console.error("Error retrieving logs:", error);
    return res.status(500).json({
      status: false,
      message: "เกิดข้อผิดพลาดในการดึงข้อมูล",
      error: error.message,
    });
  }
};