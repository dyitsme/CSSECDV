const db = require("../models/db");
const Post = require("../models/post");
const logger = require('../logger');

const adminView = async (req, res) => {
  const success_msg = await req.flash("success_msg");
  const users = await db.getAllUsers();
  const posts = await Post.getAllPosts();
  res.render("admin", { users, posts, success_msg: success_msg });
};

const deleteUserView = async (req, res) => {
  const id = req.params.id;
  const user = await db.getUserById(id);
  //console.log(user);
  res.render("deleteuser", { user });
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  const toDelete = await db.getUserById(id)
  const result = await db.deleteUserById(id);
  if (result) {
    logger.info(`Admin Action: '${req.session.user?.email}' deleted '${toDelete.email}'.`);
    req.flash("success_msg", "Successfully deleted user");
    res.redirect("/admin");
  }
};

const deactivateUserView = async (req, res) => {
  const id = req.params.id;
  const user = await db.getUserById(id);
  //console.log(user);
  res.render("deactivateuser", { user });

};

const activateUserView = async (req, res) => {
  const id = req.params.id;
  const user = await db.getUserById(id);
  console.log(user);
  res.render("activateuser", { user });
};

const deactivateUser = async (req, res) => {
  const id = req.params.id;
  const toDeactivate = await db.getUserById(id)
  const result = await db.deactivateUserById(id);
  //console.log(result);
  if (result) {
    logger.info(`Admin Action: '${req.session.user?.email}' deactivated '${toDeactivate.email}'.`);
    req.flash("success_msg", "Successfully deactivated user");
    res.redirect("/admin");
  }
};

const activateUser = async (req, res) => {
  const id = req.params.id;
  const toDeactivate = await db.getUserById(id)
  const result = await db.activateUserById(id);
  //console.log(result);
  if (result) {
    logger.info(`Admin Action: '${req.session.user?.email}' activated '${toDeactivate.email}'.`);
    req.flash("success_msg", "Successfully activated user");
    res.redirect("/admin");
  }
};

const deletePost = async (req, res) => {
  const id = req.params.id;
  const toDelete = await Post.getPostById(id)
  const poster = await db.getUserById(toDelete.userId)
  const result = await Post.deletePostById(id);
  if (result) {
    logger.info(`Admin Action: '${req.session.user?.email}' deleted post '${toDelete.id}' by '${poster.email}'.`);
    req.flash("success_msg", "Successfully deleted post");
    res.redirect("/admin");
  }
}

const deletePostAdminView = async (req, res) => {
  const id = req.params.id;
  const post = await Post.getPostById(id);
  //console.log(post)
  res.render("deletepostadmin", { post });
}

module.exports = {
  adminView,
  deleteUserView,
  deleteUser,
  deactivateUserView,
  activateUserView,
  deactivateUser,
  activateUser,
  deletePost,
  deletePostAdminView
};