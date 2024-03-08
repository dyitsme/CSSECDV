const express = require("express");
const loginController = require("../controllers/loginController");
const homeController = require("../controllers/homeController");
const adminController = require("../controllers/adminController");
const postController = require("../controllers/postController");
const session = require("../middleware/session");

const { postFileUpload } = require("../middleware/fileUpload");

const router = express.Router();

// main routes
router.get("/login", session.isNotAuthenticated, loginController.loginView);
router.get("/register", session.isNotAuthenticated, loginController.registerView);
router.get("/", session.isAuthenticated, homeController.homeView);
router.get("/admin", session.isAuthenticatedAdmin, adminController.adminView);
router.get("/delete-user/:id", session.isAuthenticated, adminController.deleteUserView);
router.get("/deactivate-user/:id", session.isAuthenticated, adminController.deactivateUserView);
router.get("/activate-user/:id", session.isAuthenticated, adminController.activateUserView);
router.get("/delete-post/:id", session.isAuthenticated, postController.deletePostView);


// post routes
router.get("/create-post", session.isAuthenticated, postController.createPostView);

// user api routes
router.get("/api/users", session.isAuthenticatedAdmin, loginController.getAllUsers);
router.post("/api/create-user", session.isNotAuthenticated, loginController.createUser);
router.post("/api/login", session.isNotAuthenticated, loginController.loginUser);
router.post("/api/logout", session.isAuthenticated, loginController.logoutUser);
router.post("/api/delete-user/:id", session.isAuthenticated, adminController.deleteUser);
router.post("/api/deactivate-user/:id", session.isAuthenticated, adminController.deactivateUser);
router.post("/api/activate-user/:id", session.isAuthenticated, adminController.activateUser);

// post api routes
const postUploads = postFileUpload.fields([{ name: "image", maxCount: 1 }, { name: "docu", maxCount: 1 }]);
router.post("/api/create-post", session.isAuthenticated, postUploads, postController.createPost);
router.post("/api/delete-post/:id", postController.deletePost);

module.exports = router;