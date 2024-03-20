const db = require("../models/db");
const bcrypt = require("bcrypt");
const logger = require('../logger');

const getAllUsers = async (req, res) => {
  const users = await db.getAllUsers();
  res.send(users);
};

const loginView = async (req, res) => {
  const err_msg = await req.flash("err_msg");
  res.render("login", { err_msg: err_msg });
};

const registerView = async (req, res) => {
  const err_msg = await req.flash("err_msg");
  res.render("register", { err_msg: err_msg });

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
};

const createUser = async (req, res) => {
  const { firstName, lastName, email, phone, password, confirmPass, picture } = req.body;
  if (password != confirmPass) {
    req.flash("err_msg", "Passwords do not match!");
    res.redirect("/register");
  }
  else {
    const check1 = await db.getUserByEmail(email);
    const check2 = await db.getUserByPhone(phone);
    console.log(check1)
    console.log(check2)
    if(check1) {
      req.flash("err_msg", "Email already taken!");
      res.redirect("/register");
    }
    else if(check2) {
      req.flash("err_msg", "Phone number already taken!");
      res.redirect("/register");
    }
    else {
      const saltRounds = 10;  
      const hash = await bcrypt.hash(password, saltRounds);

      console.log("req.file: ")
      console.log(req.file)

      const image = JSON.stringify({
        filename: req.file.filename,
        path: req.file.path
       });

      const user = await db.createUser(firstName, lastName, email, phone, hash, image);
      if(user) {
        logger.info(`Authentication: '${email}' created an account.`);
        res.redirect("/login");
      }
      else {
        logger.error(`Authentication: '${email}' failed to create an account.`);
        req.flash("err_msg", "Account creation failed!");
        res.redirect("/register");
      }
    }
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  
  // fetch email from database
  const user = await db.getUserByEmail(email);
  //console.log("user: ", user);
  if (user) {
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      // res.redirect("/");
      // console.log('result: ', req?.session)
      req.session.authenticated = true;
      req.session.user = { 
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin
      };
      // res.json(req.session);
      console.log('session: ',res.req.sessionID);

      // call logger after login
      logger.info(`Authentication: User '${req.session.user?.email}' logged in.`);
      //res.status(200).json({message: "Successful Login", status: 200, data: res.req.sessionID});
      const redirectUrl = user.isAdmin === 1 ? "/admin" : "/"
      res.redirect(redirectUrl);

    } else {
      logger.info(`Authentication: User '${email}' unable to log in.`);
      req.flash("err_msg", "Invalid email or password!");
      res.redirect("/login");
    }
  } else {
    logger.info(`Authentication: Unregistered user '${email}' unable to log in.`);
    req.flash("err_msg", "Invalid email or password!");
    res.redirect("/login");
  }
};

const logoutUser = (req, res) => {
  if (req.session) {
    const username = req.session.user.email;
    req.session.destroy(err => {
      if (err) {
        logger.info(`Authentication: User '${username}' unable to log out.`);
        res.status(400).send("Unable to log out");
      } else {
        logger.info(`Authentication: User '${username}' logged out.`);
        res.redirect("/login");
      }
    });
  } else {
    res.end()
  }
};

module.exports = {
  getAllUsers,
  loginView,
  registerView,
  createUser,
  loginUser,
  logoutUser
};