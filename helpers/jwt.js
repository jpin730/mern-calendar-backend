const jwt = require("jsonwebtoken");

const generateJwt = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) =>
        err ? reject("Token cannot be generated") : resolve(token)
    );
  });
};

module.exports = { generateJwt };
