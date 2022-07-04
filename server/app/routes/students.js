const express = require("express");
const router = express.Router();
const StudentController = require("../controller/studentController");
const studentValidation = require("../validation/studentValidationConfig");

console.log("Starting...............................................");
// router.use("/student/add",studentValidation.registeration)
router.post("/student/add",studentValidation.registeration, StudentController.register)
router.get("/student/get/all", StudentController.getAllStudent);
router.get("/student/get/by/:id", StudentController.getStudentById);
router.put("/student/update/:id", StudentController.updateStudent);
router.delete("/student/delete/:id", StudentController.deleteStudent);
module.exports = router;
