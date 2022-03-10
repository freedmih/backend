require("dotenv").config();

const { AuthError } = require("../errors/authError");

const jwt = require('jsonwebtoken');

module.exports.generateAccessToken = username => {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

module.exports.validateAccessToken = req => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) throw new AuthError('This route requires a JWT token', 401);

  let result;
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) throw new AuthError('Invalid JWT token', 403);

    result = user;
  });

  return result;
}