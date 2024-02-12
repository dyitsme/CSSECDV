const db = require("../models/db");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  const users = await db.getAllUsers();
  res.send(users);
};

const loginView = (req, res) => {
  if (!req.session.authenticated) {
    const err_msg = req.flash("err_msg");
    res.render("login", { err_msg: err_msg });
  }
};

const registerView = (req, res) => {
  res.render("register");

  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
  if (user) {
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      // res.redirect("/");
      req.session.authenticated = true;
      req.session.user = { email };
      // res.json(req.session);
      res.redirect("/");

    }
    else {
      // res.status(403).json({ msg: "Invalid email or password! Error p"});
      req.flash("err_msg", "Invalid email or password! Error P");
      res.redirect("/login");
    }
  }
  else {
    // res.status(403).json({ msg: "Invalid email or password! Error e"});
    req.flash("err_msg", "Invalid email or password! Error E");
    // console.log("error_msg email")
    res.redirect("/login");
  }
};

module.exports = {
  getAllUsers,
  loginView,
  registerView,
  createUser,
  loginUser
};