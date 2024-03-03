const post = require("../models/post");

const createPostView = async (req, res) => {
  res.render("createpost");
};

const createPost = async (req, res) => {
  const { userId, title, content, img, docu } = req.body
  const response = await post.createPost(userId, title, content, img, docu);
  res.json(response);
};

module.exports = {
  createPostView,
  createPost
};