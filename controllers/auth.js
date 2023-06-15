const createUser = (req, res) => {
  res.json({ ok: true, message: "create user" });
};

const loginUser = (req, res) => {
  res.json({ ok: true, message: "login user" });
};

const refreshToken = (req, res) => {
  res.json({ ok: true, message: "refresh token" });
};

module.exports = { createUser, loginUser, refreshToken };
