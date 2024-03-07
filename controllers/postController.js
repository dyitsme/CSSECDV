const Post = require("../models/post");

const createPostView = async (req, res) => {
  res.render("createpost");
};

const createPost = async (req, res) => {
  const userId = req.session.user.userId;
  
  const image = JSON.stringify({
   filename: req.files["image"][0].filename,
   path: req.files["image"][0].path
  });

  const docu = JSON.stringify({
   filename: req.files["docu"][0].filename,
   path: req.files["docu"][0].path
  });


  const { title, content } = req.body;
  const response = await Post.createPost(userId, title, content, image, docu);
  if (response) {
    res.redirect("/");
  }
};

module.exports = {
  createPostView,
  createPost
};