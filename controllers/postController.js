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

const updatePostView = async (req, res) => {
  // retrieve data from db by id
  // pass it onto the view
  const id = req.params.id;
  const post = await Post.getPostById(id);
  res.render("editpost", { post });
};

const updatePost = async (req, res) => {
  // get the data from the view by post
  // if no files have been selected dont overwrite file 
  const id = req.params.id;
  const { title, content } = req.body;
  
  const image = JSON.stringify({
   filename: req.files["image"][0].filename,
   path: req.files["image"][0].path
  });

  const docu = JSON.stringify({
   filename: req.files["docu"][0].filename,
   path: req.files["docu"][0].path
  });

  const result = await Post.editPostById(id, title, content, image, docu);
  console.log(result);
  if (result) {
    req.flash("success_msg", "Successfully updated post");
    res.redirect("/");
  }

};

const deletePostView = async (req, res) => {
  const id = req.params.id;
  const post = await Post.getPostById(id);
  console.log(post);
  res.render("deletepost", { post });
};

const deletePost = async (req, res) => {
  const id = req.params.id;
  const result = await Post.deletePostById(id);
  if (result) {
    req.flash("success_msg", "Successfully deleted post");
    res.redirect("/");
  }
};

module.exports = {
  createPostView,
  createPost,
  updatePostView,
  updatePost,
  deletePostView,
  deletePost
};