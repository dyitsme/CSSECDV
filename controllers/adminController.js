const db = require("../models/db");
const Post = require("../models/post");

const adminView = async (req, res) => {
  const success_msg = await req.flash("success_msg");
  const users = await db.getAllUsers();
  const posts = await Post.getAllPosts();
  res.render("admin", { users, posts, success_msg: success_msg });
};

const deleteUserView = async (req, res) => {
  const id = req.params.id;
  const user = await db.getUserById(id);
  console.log(user);
  res.render("deleteuser", { user });
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  const result = await db.deleteUserById(id);
  if (result) {
    req.flash("success_msg", "Successfully deleted user");
    res.redirect("/admin");
  }
};

const deactivateUserView = async (req, res) => {
  const id = req.params.id;
  const user = await db.getUserById(id);
  console.log(user);
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
  const result = await db.deactivateUserById(id);
  console.log(result);
  if (result) {
    req.flash("success_msg", "Successfully deactivated user");
    res.redirect("/admin");
  }
};

const activateUser = async (req, res) => {
  const id = req.params.id;
  const result = await db.activateUserById(id);
  console.log(result);
  if (result) {
    req.flash("success_msg", "Successfully activated user");
    res.redirect("/admin");
  }
};

const deletePost = async (req, res) => {
  const id = req.params.id;
  const result = await Post.deletePostById(id);
  if (result) {
    req.flash("success_msg", "Successfully deleted post");
    res.redirect("/admin");
  }
}

module.exports = {
  adminView,
  deleteUserView,
  deleteUser,
  deactivateUserView,
  activateUserView,
  deactivateUser,
  activateUser
};