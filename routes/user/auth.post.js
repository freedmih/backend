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
    
    body('login'),
    body('password'),

    async (req, res, next) => {
        const { login, password } = req.body;

        try {
            validateErrors(req);

            const user = await User.findOne({
                where: {
                    [Op.and]: [
                        { login },
                        { password }
                    ]
                }
            });

            if(!user) {
                throw new ApiError('Login or password don\'t match', 403);
            }

            const token = generateAccessToken({ username: user.login, id: user.id});

            return res.json({ token });
        }
        catch (err) {
            next(err)
        }
    }
);

module.exports = router;