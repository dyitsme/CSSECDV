const express = require("express");
const loginController = require("../controllers/loginController");

const router = express.Router();

router.get('/login', loginController.loginView);
router.get('/register', loginController.registerView);
router.get('/getAllUsers', loginController.getAllUsers);

module.exports = router;