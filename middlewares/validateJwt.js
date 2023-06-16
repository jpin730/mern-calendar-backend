const jwt = require("jsonwebtoken");

const validateJwt = (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "Token is required",
    });
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.JWT_SECRET);

    req.uid = uid;
    req.name = name;
  } catch {
    return res.status(401).json({
      ok: false,
      msg: "Token is invalid",
    });
  }

  next();
};

module.exports = { validateJwt };
