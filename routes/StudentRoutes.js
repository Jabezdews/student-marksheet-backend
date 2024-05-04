const express = require("express");
const { GetAllStudents, GetStudent, PostStudent, DeleteStudent, UpdateSeqValue, CalculateATG, StudentDashboardDetails, StudentDashboardDetailsByGender } = require("../controller/StudentController");


const StudentRouter = express.Router();
StudentRouter.route("/Students").get(GetAllStudents).post(UpdateSeqValue,CalculateATG, PostStudent);
StudentRouter.route("/Students/:id").get(GetStudent).delete(DeleteStudent);
StudentRouter.route("/dashboard").get(StudentDashboardDetails)
StudentRouter.route("/dashboard/:gender").get(StudentDashboardDetailsByGender)

module.exports=StudentRouter
