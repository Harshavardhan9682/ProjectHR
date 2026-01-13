const express = require("express");
const userRoutes = express.Router();
const {
  userRegister,
  getUsers,
  updateUser,
  deleteData,
  loginUser,
  getUserById,
  assignExam,
} = require("../controllers/userControllers");

const auth = require("../middleware/adminAuth");

/* PUBLIC ROUTES */
userRoutes.post("/register", userRegister);
userRoutes.post("/login", loginUser);

/* GET USERS */
userRoutes.get("/", getUsers);

/* 🔥 BULK ASSIGN EXAM — MUST COME BEFORE :id */
userRoutes.put("/assignExam", auth, assignExam);

/* SINGLE USER ROUTES (ALWAYS LAST) */
userRoutes.get("/:id", auth, getUserById);
userRoutes.put("/:id", auth, updateUser);
userRoutes.delete("/:id", auth, deleteData);

module.exports = userRoutes;
