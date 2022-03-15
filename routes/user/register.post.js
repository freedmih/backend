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
    
    body('login'),
    body('password'),
    body('passwordConfirmation'),

    async (req, res, next) => {
        const { login, password, passwordConfirmation } = req.body;

        try {
            validateErrors(req);

            let user = await User.findOne({
                where: {
                    login
                }
            });

            if(password != passwordConfirmation) {
                throw new ApiError('Password confirmation doesn\'t match Password', 400);
            }

            if(user) {
                throw new ApiError('User with same login already exists', 400);
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