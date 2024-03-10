const db = require("../models/db");
const Post = require("../models/post")

const homeView = async (req, res) => {
  // const success_msg = await req.flash("success_msg");
  const posts = await Post.getAllPosts();
  res.render("home", { posts });
};


module.exports = {
  homeView
};