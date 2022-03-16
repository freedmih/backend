const { param, body, validationResult } = require('express-validator');
const express = require('express');
const { ApiError } = require("../../errors/apiError");
const { ValidationError } = require("../../errors/validationError");
const validateErrors = require("../../errors/errorWrapper");
const { Op } = require("sequelize")

const { User } = require("../../models/index");

const router = express.Router();

router.post(
    '/register',

    body('login').isLength({ min: 3, max: 20 }).withMessage('login_validation'),
    body('password').isLength({ min: 5, max: 10 }).withMessage('password_validation'),
    body('passwordConfirmation'),

    async (req, res, next) => {
        const { login, password, passwordConfirmation } = req.body;

        try {
            validateErrors(req, res);

            let user = await User.findOne({
                where: {
                    login
                }
            });

            if (password !== passwordConfirmation) {
                throw new ApiError('password_confirm_doesnt_match', 400);
            }

            if (user) {
                throw new ApiError('user_exists', 400);
            }

            user = await User.create({
                login,
                password,
                passwordConfirmation
            });

            return res.json({
                userId: user.id
            });
        }
        catch (err) {
            next(err)
        }
    }
);

module.exports = router;