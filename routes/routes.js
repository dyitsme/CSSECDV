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
router.get("/delete-user/:id", session.isAuthenticated, adminController.deleteUserView)


// don't forget to secure other api routes such as admin
router.get("/api/users", loginController.getAllUsers);
router.post("/api/create-user", loginController.createUser);
router.post("/api/login", loginController.loginUser);
router.post("/api/delete-user/:id", session.isAuthenticated, adminController.deleteUser);

module.exports = router;