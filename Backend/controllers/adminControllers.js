const testData = require("../models/testSchema");
const adminData=require("../models/adminRegister")
const bcrypt=require("bcrypt")

const jwt = require("jsonwebtoken");
exports.testCreate = async (req, res) => {
  try {
    const { title, description, duration, passPercentage ,noOfQuestions,questionIds} = req.body;

    if (!title || !description || !duration || !passPercentage || !noOfQuestions || ! questionIds ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!Array.isArray(questionIds) || questionIds.length < 20) {
      return res.status(400).json({
        message: "At least 20 questionIds are required",
      });
    }

     if (questionIds.length !== noOfQuestions) {
      return res.status(400).json({
        message: "noOfQuestions must match questionIds length",
      });
    }
    const newExam = new testData({
      title,
      description,
      duration,
      passPercentage,
     noOfQuestions,
      questionIds
    });

    const savedData = await newExam.save();

    res.status(201).json({
      message: "Test created successfully",
      data: savedData,
    });
  } catch (error) {
    res.status(500).json({ error: error.message || "server error " });
  }
};

exports.testUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const examUpdateBy = await testData.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!examUpdateBy)
      return res.status(404).json({ message: "examUpdate not found" });
    res
      .status(200)
      .json({ message: "updated successfully", updatedData: examUpdateBy });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getTestData = async (req, res) => {
  try {
    const testdata = await testData.find();
    // console.log(req.admin,"hhhh")
    res
      .status(200)
      .json({ message: "data is successfully geted ", data: testdata });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getTestDataById = async (req, res) => {
  try {
    const id = req.params.id;
    const category=req.admin.role
    const testdata = await testData.findById(id);
    
    res.status(200).json({ message: "data get successfully ", data: testdata });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTestDataById = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedData = await testData.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "data successfully deleted ", data: deletedData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.adminRegister=async(req,res)=>{
  try{
    const {name,email,password} =req.body
     const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin={
      name,
      email,
      password:hashedPassword,
      role:"Admin"
    }

    const  savedData=await adminData.create(newAdmin)
    res.status(201).json({message:"admin successfully" , admin: savedData});


  }catch(error){
    res.status(500).json({ message: error.message });
  }

}

exports.adminLogin=async(req,res)=>{
  try{
    const {email,password}=req.body
    const admin=await adminData.findOne({email})
    if (!admin) return res.status(404).json({ message: "admin not found" });
     const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch)
          return res.status(401).json({ message: "Invalid password" });
    
        const token = jwt.sign(
          { id: admin._id, role: admin.role },
          process.env.ADMIN_KEY,
          { expiresIn: "30m" }
        );

        res.status(200).json({
      token,
      role:admin.role

    });
    

  }
  catch(error){
res.status(500).json({ message: error.message });
  }
}