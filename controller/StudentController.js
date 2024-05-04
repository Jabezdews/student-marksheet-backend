const StudentModel = require("../models/StudentModel");
const CounterModel = require("../models/CounterModel");
//get all students
exports.GetAllStudents = async (req, res) => {
  try {
    const Data = await StudentModel.find();
    res
      .status(200)
      .json({ status: "Success", data: Data, length: Data.length });
  } catch (err) {
    res.status(400).json({
      status: "Failed to Get Courses",
      Message: err.message,
    });
  }
};

// Update Seq  Value for auto increment Id
exports.UpdateSeqValue = async (req, res, next) => {
  let updateSeqVal = await CounterModel.findByIdAndUpdate(
    "autoVal",
    { $inc: { seq: 1 } },
    { new: true }
  );
  if (!updateSeqVal) {
    // If updateSeqVal is null or undefined
    const newVal = await CounterModel.create({ _id: "autoVal", seq: 1 }); // Use create method to create a new document
    req.body.id = newVal.seq;
  } else {
    req.body.id = updateSeqVal.seq;
  }
  next();
};

// calculation for during post student
exports.CalculateATG = async (req, res, next) => {
  if (!req.body.Total) {
    req.body.Total =
      Number(req.body?.["Mark 1"]) +
      Number(req.body?.["Mark 2"]) +
      Number(req.body?.["Mark 3"]) +
      Number(req.body?.["Mark 4"]) +
      Number(req.body?.["Mark 5"]);
  }
  if (!req.body.Average) {
    req.body.Average = req.body.Total / 5;
  }
  if (!req.body.Grade) {
    req.body.Grade =
      Number(req.body?.["Mark 1"]) < 35 ||
      Number(req.body?.["Mark 2"]) < 35 ||
      Number(req.body?.["Mark 3"]) < 35 ||
      Number(req.body?.["Mark 4"]) < 35 ||
      Number(req.body?.["Mark 5"]) < 35
        ? "Fair & Fail"
        : req.body.Average >= 35 && req.body.Average < 50
        ? "Ok"
        : req.body.Average >= 50 && req.body.Average < 75
        ? "Good"
        : req.body.Average >= 75 && req.body.Average < 90
        ? "Very Good"
        : req.body.Average >= 90
        ? "Excellent"
        : "";
  }
  next();
};

// Post / Create student
exports.PostStudent = async (req, res) => {
  try {
    let Student = await StudentModel.create(req.body);

    res.status(201).json({
      status: "success",
      message: "Student marksheet  Created Successfully!",
      data: {
        // ...Student,
        id: req.body.id,
        Average: req.body.Average,
        Grade: req.body.Grade,
        Total: req.body.Total,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed to Post Course",
      Message: err.message,
    });
  }
};
// get student by id
exports.GetStudent = async (req, res) => {
  try {
    let Data = await StudentModel.find({ id: req.params.id });
    res.status(201).json({ status: "Success", data: Data });
  } catch (err) {
    res.status(404).json({
      status: "Failed to Get Courses",
      Message: err.message,
    });
  }
};

// Delete Student by id
exports.DeleteStudent = async (req, res) => {
  console.log(req.params);
  try {
    let Student = await StudentModel.findByIdAndDelete(req.params.id);
    res.status(201).json({
      status: "success",
      message: "Student Deleted Successfully",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed to Delete Student ",
      Message: err.message,
    });
  }
};
exports.StudentDashboardDetails = async (req, res) => {
  console.log(req.params, 124);
  try {
    const Data = await StudentModel.aggregate([
      {
        $unwind: "$Grade",
      },
      {
        $group: {
          _id: "$Grade", //grouping is based on _Id field works like reduce method and give the result
          GradeCount: { $sum: 1 },

          // Movies: { $push: "$name" }, //push the name filed in the movie array
        },
      },
    ]);
    let modified = {};
    Data.map((item) => {
      modified[item._id] = item.GradeCount;
    });
    res
      .status(200)
      .json({ status: "Success", data: modified});
  } catch (err) {
    res.status(400).json({
      status: "Failed to Get StudentDashboardDetails",
      Message: err.message,
    });
  }
};
exports.StudentDashboardDetailsByGender = async (req, res) => {
  try {
    // let GenderData = await StudentModel.find({ Gender: req.params.gender });

    const Data = await StudentModel.aggregate([
      {
        $match: {
          Gender: req.params.gender
        }
      },
      {
        $unwind: "$Grade",
      },
      {
        $group: {
          _id: "$Grade", //grouping is based on _Id field works like reduce method and give the result
          GradeCount: { $sum: 1 },

          // Movies: { $push: "$name" }, //push the name filed in the movie array
        },
      },
    ]);

    let modified = {};
    Data.map((item) => {
      modified[item._id] = item.GradeCount;
    });
    res.status(201).json({ status: "Success", data: modified });
  } catch (err) {
    res.status(404).json({
      status: "Failed to Get Courses",
      Message: err.message,
    });
  }
};
