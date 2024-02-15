const db = require("../models/db");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  const users = await db.getAllUsers();
  res.send(users);
};

const loginView = async (req, res) => {
  const err_msg = await req.flash("err_msg");
  res.render("login", { err_msg: err_msg });
};

const registerView = (req, res) => {
  res.render("register");

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
};

const createUser = async (req, res) => {
  const { firstName, lastName, email, phone, password, confirmPass, picture } = req.body;
  if (password != confirmPass) {
    res.redirect("/register");
  }
  else {
    const saltRounds = 10;  
    const hash = await bcrypt.hash(password, saltRounds);
    const user = await db.createUser(firstName, lastName, email, phone, hash, picture);
    res.redirect("/login");
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  // fetch email from database
  const user = await db.getUserByEmail(email);
  console.log("user: ", user);
  if (user) {
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      // res.redirect("/");
      console.log('result: ', req?.session)
      req.session.authenticated = true;
      req.session.user = { 
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin
      };
      // res.json(req.session);
      console.log('session: ',res.req.sessionID);
      //res.status(200).json({message: "Successful Login", status: 200, data: res.req.sessionID});
      console.log(user.isAdmin);
      if (user.isAdmin == 1) {
        res.redirect("/admin");
      }
      else {
        res.redirect("/");
      }
    } else {
      req.flash("err_msg", "Invalid email or password!");
      res.redirect("/login");
    }
  } else {
    req.flash("err_msg", "Invalid email or password!");
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