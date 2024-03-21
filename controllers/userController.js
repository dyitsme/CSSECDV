const db = require("../models/db");
const logger = require('../logger');

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
  
  var namePattern = /^[a-zA-Z][a-zA-Z\s-]{0,18}[a-zA-Z]$/;
  if (namePattern.test(firstName) && namePattern.test(lastName)) {
    const result = await db.editUser(id, firstName, lastName, image);
    console.log(result);
    if (result) {
      logger.info(`Transaction: User '${req.session.user?.email}' edited their profile.`);
      req.flash("success_msg", "Successfully updated profile");
      res.redirect("/");
    } else {
      logger.info(`Transaction: User '${req.session.user?.email}' failed to edit their profile.`);
      req.flash("success_msg", "Failed to edit profile");
      res.redirect("/edit-profile");
    }
  }
};


module.exports = {
  editProfile,
  editProfileView
}