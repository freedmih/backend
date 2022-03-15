require("dotenv").config();

const { ApiError } = require("../errors/apiError");

const jwt = require('jsonwebtoken');

module.exports.generateAccessToken = username => {
  return jwt.sign(username, process.env.TOKEN_SECRET);
}

module.exports.validateAccessToken = req => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) throw new ApiError('This route requires a JWT token', 401);

  let result;
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) throw new ApiError('Invalid JWT token', 403);

    result = user;
  });

  return result;
}