const db = require("../models/db");

const getAllUsers = async (req, res) => {
  const users = await db.getAllUsers();
  res.send(users);
}

const loginView = (req, res) => {
  res.render("login");
}

const registerView = (req, res) => {
  res.render("register");
}

const createUser = async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;
  const user = await db.createUser(firstName, lastName, email, phone, password);
  res.status(200).send("ok");

}

module.exports = {
  getAllUsers,
  loginView,
  registerView,
  createUser
}