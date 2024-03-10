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
  const userId = req.session.user.userId
  // get session id of user, if fail show an error page
  const post = await Post.getUserPostById(id, userId);
  if (post) {
    res.render("editpost", { post });
  }
  else {
    res.render("404");
  }
};

const updatePost = async (req, res) => {
  // get the data from the view by post
  // userId
  // if no files have been selected dont overwrite file 
  const id = req.params.id;
  const userId = req.session.user.userId;
  const { title, content } = req.body;
  
  const image = JSON.stringify({
   filename: req.files["image"][0].filename,
   path: req.files["image"][0].path
  });

  const docu = JSON.stringify({
   filename: req.files["docu"][0].filename,
   path: req.files["docu"][0].path
  });

  const valid = await Post.getUserPostById(id, userId);
  if (valid) {
    const result = await Post.editPostById(id, title, content, image, docu);
    console.log(result);
    if (result) {
      req.flash("success_msg", "Successfully updated post");
      res.redirect("/");
    }
  }
  else {
    res.status(403).send("This is a forbidden action");

  }
};

const deletePostView = async (req, res) => {
  const id = req.params.id;
  const userId = req.session.user.userId;
  const post = await Post.getUserPostById(id, userId);
  console.log(post);
  if (post) {
    res.render("deletepost", { post });
  }
  else {
    res.render("404");
  }
};

const deletePost = async (req, res) => {
  const id = req.params.id;
  const userId = req.session.user.userId;

  const valid = await Post.getUserPostById(id, userId);
  if (valid) {
    const result = await Post.deletePostById(id);
    if (result) {
      req.flash("success_msg", "Successfully deleted post");
      res.redirect("/");
    }
  }
  else {
    res.status(403).send("This is a forbidden action");
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