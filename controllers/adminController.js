const db = require("../models/db");

const adminView = async (req, res) => {
  const success_msg = await req.flash("success_msg");
  const users = await db.getNonAdminUsers();
  res.render("admin", { users, success_msg: success_msg });
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  const result = await db.deleteUser(id);
  if (result) {
    req.flash("success_msg", `Successfully deleted user`);
    res.redirect("/admin");
  }
};


module.exports = {
  adminView,
  deleteUser
};