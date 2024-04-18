const express = require("express");
const { GetAllStudents, GetStudent, PostStudent, DeleteStudent, UpdateSeqValue, CalculateATG } = require("../controller/StudentController");


const StudentRouter = express.Router();
StudentRouter.route("/Students").get(GetAllStudents).post(UpdateSeqValue,CalculateATG, PostStudent);
StudentRouter.route("/Students/:id").get(GetStudent).delete(DeleteStudent);
module.exports=StudentRouter
