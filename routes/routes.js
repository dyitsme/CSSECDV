const express = require("express");
const loginController = require("../controllers/loginController");
const homeController = require("../controllers/homeController");
const adminController = require("../controllers/adminController");
const postController = require("../controllers/postController");
const session = require("../middleware/session");

const router = express.Router();

// main routes
router.get("/login", session.isNotAuthenticated, loginController.loginView);
router.get("/register", session.isNotAuthenticated, loginController.registerView);
router.get("/", session.isAuthenticated, homeController.homeView);
router.get("/admin", session.isAuthenticatedAdmin, adminController.adminView);
router.get("/delete-user/:id", session.isAuthenticated, adminController.deleteUserView);
router.get("/deactivate-user/:id", session.isAuthenticated, adminController.deactivateUserView);
router.get("/activate-user/:id", session.isAuthenticated, adminController.activateUserView);


// post routes
router.get("/create-post", postController.createPostView);

// user api routes
router.get("/api/users", session.isAuthenticatedAdmin, loginController.getAllUsers);
router.post("/api/create-user", session.isNotAuthenticated, loginController.createUser);
router.post("/api/login", session.isNotAuthenticated, loginController.loginUser);
router.post("/api/logout", session.isAuthenticated, loginController.logoutUser);
router.post("/api/delete-user/:id", session.isAuthenticated, adminController.deleteUser);
router.post("/api/deactivate-user/:id", session.isAuthenticated, adminController.deactivateUser);
router.post("/api/activate-user/:id", session.isAuthenticated, adminController.activateUser);

// post api routes
router.post("/api/create-post", postController.createPost)

module.exports = router;