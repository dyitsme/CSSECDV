const express = require("express");
const loginController = require("../controllers/loginController");
const homeController = require("../controllers/homeController");
const adminController = require("../controllers/adminController");
const postController = require("../controllers/postController");
const session = require("../middleware/session");

const { postFileUpload } = require("../middleware/fileUpload");

const router = express.Router();
const postUploads = postFileUpload.fields([{ name: "image", maxCount: 1 }, { name: "docu", maxCount: 1 }]);

// login routes
router.get("/login", session.isNotAuthenticated, loginController.loginView);
router.get("/register", session.isNotAuthenticated, loginController.registerView);
router.get("/", session.isAuthenticated, homeController.homeView);

// admin routes
router.get("/admin", session.isAuthenticatedAdmin, adminController.adminView);
router.get("/delete-user/:id", session.isAuthenticatedAdmin, adminController.deleteUserView);
router.get("/deactivate-user/:id", session.isAuthenticatedAdmin, adminController.deactivateUserView);
router.get("/delete-post-admin/:id", session.isAuthenticatedAdmin, adminController.deletePostAdminView);

router.get("/activate-user/:id", session.isAuthenticatedAdmin, adminController.activateUserView);
router.get("/edit-post/:id", session.isAuthenticated, postController.updatePostView);
router.get("/delete-post/:id", session.isAuthenticated, postController.deletePostView);


// post routes
router.get("/create-post", session.isAuthenticated, postController.createPostView);

// user api routes
router.get("/api/users", session.isAuthenticatedAdmin, loginController.getAllUsers);
router.post("/api/create-user", session.isNotAuthenticated, loginController.createUser);
router.post("/api/login", session.isNotAuthenticated, loginController.loginUser);
router.post("/api/logout", session.isAuthenticated, loginController.logoutUser);
router.post("/api/delete-user/:id", session.isAuthenticatedAdmin, adminController.deleteUser);
router.post("/api/deactivate-user/:id", session.isAuthenticatedAdmin, adminController.deactivateUser);
router.post("/api/activate-user/:id", session.isAuthenticatedAdmin, adminController.activateUser);

// post api routes
router.post("/api/create-post", session.isAuthenticated, postUploads, postController.createPost);
router.post("/api/edit-post/:id", session.isAuthenticated, postUploads, postController.updatePost);
router.post("/api/delete-post/:id", session.isAuthenticated, postController.deletePost);
router.post("/api/delete-post-admin/:id", session.isAuthenticatedAdmin, adminController.deletePost);

module.exports = router;