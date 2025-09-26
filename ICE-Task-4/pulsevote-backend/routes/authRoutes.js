const express = require("express");
const { register, login } = require("../controllers/authController");
const { body } = require("express-validator");

const router = express.Router();

// 🔐 Validators
const emailValidator = body("email")
  .custom((value, { req }) => {
    if (!req.body.email) throw new Error("Email is required");
    return true;
  })
  .isEmail().withMessage("Email must be valid")
  .normalizeEmail();

const passwordValidator = body("password")
  .custom((value, { req }) => {
    if (!req.body.password) throw new Error("Password is required");
    return true;
  })
  .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
  .matches(/[A-Za-z]/).withMessage("Password must include a letter")
  .matches(/\d/).withMessage("Password must include a number")
  .trim().escape();

const loginPasswordValidator = body("password")
  .custom((value, { req }) => {
    if (!req.body.password) throw new Error("Password is required");
    return true;
  })
  .trim().escape();

// 🧠 Routes with validation
router.post("/register", [emailValidator, passwordValidator], register);
router.post("/login", [emailValidator, loginPasswordValidator], login);

module.exports = router;
