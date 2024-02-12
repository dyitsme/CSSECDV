const db = require("../models/db");

const homeView = (req, res) => {
  if (req.session.authenticated) {
    res.render("home");
  }
  else {
    res.redirect("/login");
  }
};

module.exports = {
  homeView
};