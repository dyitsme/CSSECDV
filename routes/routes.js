const express = require("express");
const loginController = require("../controllers/loginController");
const homeController = require("../controllers/homeController");
const adminController = require("../controllers/adminController");
const session = require("../middleware/session");

const router = express.Router();

router.get("/login", session.isNotAuthenticated, loginController.loginView);
router.get("/register", session.isNotAuthenticated, loginController.registerView);
router.get("/", session.isAuthenticated, homeController.homeView);
router.get("/admin", session.isAuthenticated, adminController.adminView);
router.get("/delete-user/:id", session.isAuthenticated, adminController.deleteUserView);
router.get("/deactivate-user/:id", session.isAuthenticated, adminController.deactivateUserView);
router.get("/activate-user/:id", session.isAuthenticated, adminController.activateUserView);


// don't forget to secure other api routes such as admin
router.get("/api/users", loginController.getAllUsers);
router.post("/api/create-user", loginController.createUser);
router.post("/api/login", loginController.loginUser);
router.post("/api/delete-user/:id", session.isAuthenticated, adminController.deleteUser);
router.post("/api/deactivate-user/:id", session.isAuthenticated, adminController.deactivateUser);
router.post("/api/activate-user/:id", session.isAuthenticated, adminController.activateUser);

module.exports = router;