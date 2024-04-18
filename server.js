const mongoose = require("mongoose");
const dotEnv = require("dotenv");
dotEnv.config({ path: "./config.env" });
const PORT = process.env.PORT | 3001;
const app=require('./app')

mongoose
  .connect(process.env.COMPASS_CON_STRING)
  .then((conn) => console.log(`connected to the database`))
  .catch((err) => console.log(err));

const server = app.listen(PORT, () => console.log("server start successfully"));