const db = require("../models/db");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  const users = await db.getAllUsers();
  res.send(users);
};

const loginView = (req, res) => {
  res.render("login");
};

const registerView = (req, res) => {
  res.render("register");
};

const createUser = async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;
  const saltRounds = 10;  
  const hash = await bcrypt.hash(password, saltRounds);

  const user = await db.createUser(firstName, lastName, email, phone, hash);
  res.status(200).send("ok");

};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // fetch email from database
  const user = await db.getUserByEmail(email);
  console.log(user);

  const isMatch = await bcrypt.compare(password, user.password);
  res.send(isMatch);
};

module.exports = {
  getAllUsers,
  loginView,
  registerView,
  createUser,
  loginUser
};