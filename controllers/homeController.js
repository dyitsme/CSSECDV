const db = require("../models/db");

const homeView = (req, res) => {
    res.render("home");
};

module.exports = {
  homeView
};