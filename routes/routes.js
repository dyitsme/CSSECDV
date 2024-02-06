const express = require("express");
const loginController = require("../controllers/loginController");

const router = express.Router();

router.get("/login", loginController.loginView);
router.get("/register", loginController.registerView);
router.get("/api/users", loginController.getAllUsers);
router.post("/api/create-user", loginController.createUser);
router.post("/api/login-user", loginController.loginUser);

module.exports = router;