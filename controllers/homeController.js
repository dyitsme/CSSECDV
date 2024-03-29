const db = require("../models/db");
const Post = require("../models/post")

const homeView = async (req, res) => {
  // const success_msg = await req.flash("success_msg");
  const userId = req.session.user.userId;
  const user = await db.getUserById(userId);
  const posts = await Post.getAllPosts(userId);
  res.render("home", { user, posts });
};


module.exports = {
  homeView
};