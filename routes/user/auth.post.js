const { param, body, validationResult } = require('express-validator');
const express = require('express');
const { ApiError } = require("../../errors/apiError");
const { ValidationError } = require("../../errors/validationError");
const validateErrors = require("../../errors/errorWrapper");
const { Op } = require("sequelize")

const { User } = require("../../models/index");

const { generateAccessToken } = require("../../helpers/jwt");

const router = express.Router();

router.post(
    '/auth',

    body('login').isLength({ min: 3, max: 20 }).withMessage('The login must be 3 to 20 characters length'),
    body('password').isLength({ min: 5, max: 10 }).withMessage('The password must be 3 to 20 characters length'),

    async (req, res, next) => {
        const { login, password } = req.body;

        try {
            validateErrors(req);

            const user = await User.findOne({
                where: {
                        login,
                }
            });

            if (!user || !user.validPassword(password)) {
                throw new ApiError('Login or password don\'t match', 403);
            }

            const token = generateAccessToken({ username: user.login, id: user.id });

            return res.json({ token });
        }
        catch (err) {
            next(err)
        }
    }
);

module.exports = router;