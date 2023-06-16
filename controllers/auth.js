const User = require("../models/User");

const createUser = async (req, res) => {
  try {
    const { email } = req.body;

    const userExists = !!(await User.findOne({ email }));

    if (userExists) {
      return res
        .status(400)
        .json({ ok: false, msg: "User email already exists" });
    }

    const user = new User(req.body);

    await user.save();

    res
      .status(201)
      .json({ ok: true, msg: "User created", uid: user.id, name: user.name });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ ok: false, msg: "User cannot be created" });
  }
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  res.status(201).json({ ok: true, msg: "Logged in user" });
};

const refreshToken = (req, res) => {
  res.json({ ok: true, msg: "refresh token" });
};

module.exports = { createUser, loginUser, refreshToken };
