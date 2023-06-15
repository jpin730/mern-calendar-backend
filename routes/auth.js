const { Router } = require("express");

const router = Router();

const { createUser, loginUser, refreshToken } = require("../controllers/auth");

router.post("/user", createUser);

router.post("/login", loginUser);

router.get("/token", refreshToken);

module.exports = router;
