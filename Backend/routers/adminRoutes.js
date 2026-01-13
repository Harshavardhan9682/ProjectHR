const express = require("express");
adminRoutes = express.Router();

const auth =require("../middleware/adminAuth")
const {
  testCreate,
  testUpdate,
  getTestData,
  deleteTestDataById,
  getTestDataById,
  adminLogin,
  adminRegister
} = require("../controllers/adminControllers");

adminRoutes.post("/test",auth, testCreate);
adminRoutes.get("/",getTestData);
adminRoutes.get("/:id",auth,getTestDataById);
adminRoutes.put("/:id",auth, testUpdate);
adminRoutes.delete("/delete",auth, deleteTestDataById);
adminRoutes.post("/register",adminRegister)
adminRoutes.post("/login",adminLogin)
module.exports = adminRoutes;
