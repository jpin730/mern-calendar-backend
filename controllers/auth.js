const bcrypt = require("bcryptjs");

const User = require("../models/User");
const { generateJwt } = require("../helpers/jwt");

const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = !!(await User.findOne({ email }));

    if (userExists) {
      return res
        .status(400)
        .json({ ok: false, msg: "User email already exists" });
    }

    const user = new User(req.body);

    user.password = bcrypt.hashSync(password, bcrypt.genSaltSync());

    await user.save();

    const token = await generateJwt(user.id, user.name);

    res.status(201).json({
      ok: true,
      msg: "User created",
      uid: user.id,
      name: user.name,
      token,
    });
  } catch {
    res.status(500).json({ ok: false, msg: "Server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ ok: false, msg: "User email does not exist" });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res
        .status(400)
        .json({ ok: false, msg: "User password is incorrect" });
    }

    const token = await generateJwt(user.id, user.name);

    res.status(201).json({
      ok: true,
      msg: "Logged in user",
      uid: user.id,
      name: user.name,
      token,
    });
  } catch {
    res.status(500).json({ ok: false, msg: "Server error" });
  }
};

const refreshToken = async (req, res) => {
  const { uid, name } = req;

  const token = await generateJwt(uid, name);

  res.json({ ok: true, msg: "Token valid", uid, name, token });
};

module.exports = { createUser, loginUser, refreshToken };
