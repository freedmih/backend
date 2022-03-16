require("dotenv").config();

const { ApiError } = require("../errors/apiError");

const jwt = require('jsonwebtoken');

module.exports.generateAccessToken = username => {
  return jwt.sign(username, process.env.TOKEN_SECRET);
}

module.exports.validateAccessToken = req => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) throw new ApiError(res.__('requires_jwt'), 401);

  let result;
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) throw new ApiError(res.__('invalid_jwt'), 403);

    result = user;
  });

  return result;
}