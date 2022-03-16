require("dotenv").config();

const { ApiError } = require("../errors/apiError");

const jwt = require('jsonwebtoken');

module.exports.generateAccessToken = username => {
  return jwt.sign(username, process.env.TOKEN_SECRET);
}

module.exports.validateAccessToken = (req, res) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) throw new ApiError('requires_jwt', 401);

  let result;
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) throw new ApiError('invalid_jwt', 403);

    result = user;
  });

  return result;
}