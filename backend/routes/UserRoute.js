const express = require("express");
const router = express.Router();

// Importing Controller
const { register, login, logout, updateUser } = require("../controllers/UserController");

// Importing Middleware
const { Auth } = require("../middlewares/Auth_Middleware");

// api's
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-user", Auth, updateUser);

module.exports = router;
