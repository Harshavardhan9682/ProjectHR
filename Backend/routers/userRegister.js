const express = require("express");
const userRoutes = express.Router();
const {
  userRegister,
  getUsers,
  updateUser,
  deleteData,
  loginUser,
  getUserById
} = require("../controllers/userControllers");
const auth=require("../middleware/adminAuth")
userRoutes.post("/register", userRegister);
userRoutes.get("/", auth,getUsers);
userRoutes.get("/:id",auth,getUserById)
userRoutes.put("/:id",auth, updateUser);
userRoutes.delete("/:id",auth, deleteData);
userRoutes.post("/login",loginUser);

module.exports = userRoutes;
