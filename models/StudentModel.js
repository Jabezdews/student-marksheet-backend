const mongoose = require("mongoose");
const StudentSchema = new mongoose.Schema({
  id: {
    type: Number,
    default: 1,
    unique: true,
  },
  Name: {
    type: String,
    required: [true, "Name Field is Required !"],
  },
  Email: {
    type: String,
    required: [true, "Email Field is Required !"],
    unique: true,
  },
  "Phone Number": {
    type: Number,
    required: [true, "Phone Number Field is Required !"],
  },
  Gender: {
    type: String,
    required: [true, "Gender Field is Required !"],
  },
  Standard: {
    type: Number,
    required: [true, "Standard Field is Required !"],
  },
  "Mark 1": {
    type: Number,
    required: [true, "Mark 1 Field is Required !"],
  },
  "Mark 2": {
    type: Number,
    required: [true, "Mark 2 Field is Required !"],
  },
  "Mark 3": {
    type: Number,
    required: [true, "Mark 3 Field is Required !"],
  },
  "Mark 4": {
    type: Number,
    required: [true, "Mark 4 Field is Required !"],
  },
  "Mark 5": {
    type: Number,
    required: [true, "Mark 5 Field is Required !"],
  },
  Total: {
    type: Number,
  },
  Average: {
    type: Number,
  },
  Grade: {
    type: String,
  },
});

const StudentModel = mongoose.model("Student", StudentSchema);
module.exports = StudentModel;
