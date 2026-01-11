const User = require("../models/userRegister");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/* REGISTER */
exports.userRegister = async (req, res) => {
  try {
    const { name, email, password, category } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      category,
      status: "Active",
    });

    res.status(201).json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  


    if (!user) return res.status(404).json({ message: "User not found" });

    if(user.status=="Inactive") return res.status(403).json({message:"user is  inactive "})
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    if (user.status == "inActive") {
      return res
        .status(403)
        .json({ message: "User account is inactive. Please contact admin." });
    }

    const token = jwt.sign(
      { id: user._id, category: user.category },
      process.env.ADMIN_KEY,
      { expiresIn: "30m" }
    );

    res.status(200).json({
      token,
      category: user.category,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json({ data: users });
};

/* GET USER BY ID */
exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json({ user });
};

/* UPDATE USER */
exports.updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json({ user });
};

/* DELETE USER */
exports.deleteData = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};
