const mongoose = require("mongoose");
const CounterSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: "autoVal",
  },
  seq: {
    type: Number,
    default: 1,
  },
});
const CounterModel = mongoose.model("Counter", CounterSchema);
module.exports = CounterModel;
