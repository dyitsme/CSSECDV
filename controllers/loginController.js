const db = require("../models/db");

const getAllUsers = async (req, res) => {
  const users = await db.getAllUsers();
  res.send(users);
}

const loginView = (req, res) => {
  res.render("login");
}

const registerView = (req, res) => {
  res.render("register")
}

module.exports = {
  getAllUsers,
  loginView,
  registerView
}