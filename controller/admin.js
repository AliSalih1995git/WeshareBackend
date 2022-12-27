const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/tokens");
const Admin = require("../models/Admin");
const User = require("../models/User");

//LOGIN ADMIN
const loginAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin) {
      return res.status(404).json(" Such admin not found");
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      admin.password
    );
    if (!validPassword) {
      return res.status(400).json("password incorrect");
    }
    const token = generateToken({ id: admin._id.toString() }, "7d");
    res.status(200).json({
      _id: admin.id,
      email: admin.email,
      token: token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
//GET ALL USERS
const getAllUsers = async (req, res) => {
  const users = await User.find({}).select("username email picture isBlock");
  res.json(users);
};
//DELETE USERS
const deleteUser = async (req, res) => {
  const { id } = req.params;
  const userDelete = await User.findByIdAndDelete(id);
  res.json({ id });
};
//BLOCK USERS
const blockUser = async (req, res) => {
  const { id } = req.params;
  const userBlock = await User.findByIdAndUpdate(
    { _id: id },
    { $set: { isBlock: true } },
    { upsert: true }
  );

  res.json({ id });
};
//UNBLOCK USERS
const unBlockUser = async (req, res) => {
  const { id } = req.params;
  const userUnblock = await User.findByIdAndUpdate(
    { _id: id },
    { $set: { isBlock: false } },
    { upsert: true }
  );
  res.json({ id });
};

module.exports = {
  getAllUsers,
  deleteUser,
  blockUser,
  unBlockUser,
};
