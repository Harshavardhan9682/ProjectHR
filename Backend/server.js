const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routers/userRegister");
const AdminRoutes = require("./routers/adminRoutes");
const questionRoutes = require("./routers/addQuestions");
const  auth = require("./middleware/auth")
const submitRoutes=require("./routers/submitData")
const mongoose = require("mongoose");
app.use(cors());
dotenv.config();
app.use(express.json());
// app.use(auth)

app.use("/admin", AdminRoutes);
app.use("/questions", questionRoutes);
app.use("/user",userRoutes);
app.use("/exam",submitRoutes)
mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((err) => {
    console.error(err);
  });

app.listen(5000, () => {
  console.log("server is running  on  port on  5000");
});
