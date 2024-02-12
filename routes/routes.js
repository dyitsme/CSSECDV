const express = require("express");
const loginController = require("../controllers/loginController");
const homeController = require("../controllers/homeController");
const session = require("../middleware/session");

const router = express.Router();

router.get("/login", loginController.loginView);
router.get("/register", loginController.registerView);
router.get("/api/users", loginController.getAllUsers);
router.post("/api/create-user", loginController.createUser);
router.post("/api/login", loginController.loginUser);

router.get("/", session.isAuthenticated, homeController.homeView);

module.exports = router;