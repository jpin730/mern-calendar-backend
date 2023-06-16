const { Router } = require("express");
const { check } = require("express-validator");

const router = Router();

const { createUser, loginUser, refreshToken } = require("../controllers/auth");
const { validateFields } = require("../middlewares/validateFields");
const { validateJwt } = require("../middlewares/validateJwt");

const passwordMinLength = 6;

router.post(
  "/user",
  [
    check("name", "Valid name is required").not().isEmpty(),
    check("email", "Valid email is required").isEmail(),
    check(
      "password",
      `Password must be at least ${passwordMinLength} characters`
    ).isLength({
      min: passwordMinLength,
    }),
    validateFields,
  ],
  createUser
);

router.post(
  "/login",
  [
    check("email", "Valid email is required").isEmail(),
    check(
      "password",
      `Password must be at least ${passwordMinLength} characters`
    ).isLength({
      min: passwordMinLength,
    }),
    validateFields,
  ],
  loginUser
);

router.get("/token", validateJwt, refreshToken);

module.exports = router;
