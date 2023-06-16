const bcrypt = require("bcryptjs");

const encrypt = (value) => bcrypt.hashSync(value, bcrypt.genSaltSync());

module.exports = encrypt;
