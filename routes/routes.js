const express = require("express");
const loginController = require("../controllers/loginController");
const homeController = require("../controllers/homeController");
const session = require("../middleware/session");

const router = express.Router();

router.get("/login", session.isNotAuthenticated, loginController.loginView);
router.get("/register", session.isNotAuthenticated, loginController.registerView);
router.get("/api/users", loginController.getAllUsers);
router.post("/api/create-user", loginController.createUser);
router.post("/api/login", loginController.loginUser);
router.post("/api/logout", loginController.logoutUser);

router.get("/", session.isAuthenticated, homeController.homeView);
router.get("/admin", session.isAuthenticated, homeController.adminView);

module.exports = router;