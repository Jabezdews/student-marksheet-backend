const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const StudentRouter = require("./routes/StudentRoutes");

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/api/v1", StudentRouter);
module.exports = app;