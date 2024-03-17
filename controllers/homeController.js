const db = require("../models/db");
const Post = require("../models/post")

const homeView = async (req, res) => {
  // const success_msg = await req.flash("success_msg");
  const userId = req.session.user.userId;
  const posts = await Post.getAllPosts(userId);
  console.log(posts);
  res.render("home", { posts });
};


module.exports = {
  homeView
};