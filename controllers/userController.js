const db = require("../models/db");

const editProfileView = async (req, res) => {
  const id = req.session.user.userId
  const user = await db.getUserById(id);
  res.render("editprofile", { user });
};

const editProfile = async (req, res) => {
  const id = req.session.user.userId;
  const { firstName, lastName } = req.body;
  
  const image = JSON.stringify({
   filename: req.file.filename,
   path: req.file.path
  });
  
  const result = await db.editUser(id, firstName, lastName, image);
  console.log(result);
  if (result) {
    req.flash("success_msg", "Successfully updated profile");
    res.redirect("/");
  }
};


module.exports = {
  editProfile,
  editProfileView
}