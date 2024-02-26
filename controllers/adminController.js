const db = require("../models/db");

const adminView = async (req, res) => {
  const users = await db.getUsersOnly();
  res.render("admin", { users });
};


module.exports = {
  adminView
};