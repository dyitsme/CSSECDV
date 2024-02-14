const db = require("../models/db");

const homeView = (req, res) => {
    res.render("home");
};

const adminView = (req, res) => {
    res.render("admin");
};

module.exports = {
  homeView,
  adminView
};