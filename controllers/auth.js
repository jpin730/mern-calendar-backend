const { validationResult } = require("express-validator");

const createUser = (req, res) => {
  const { name, email, password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }

  res.status(201).json({ ok: true, msg: "User created" });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }

  res.status(201).json({ ok: true, msg: "Logged in user" });
};

const refreshToken = (req, res) => {
  res.json({ ok: true, msg: "refresh token" });
};

module.exports = { createUser, loginUser, refreshToken };
