require("dotenv").config();

const jwt = require('jsonwebtoken');

module.exports.generateAccessToken = username => {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}