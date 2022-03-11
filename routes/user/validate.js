const { param, body, validationResult } = require('express-validator');
var express = require('express');
const { ApiError } = require("../../errors/apiError");
const { ValidationError } = require("../../errors/validationError");
const validateErrors = require("../../errors/errorWrapper");
const { Op } = require("sequelize")

const { User } = require("../../models/index");

const { generateAccessToken } = require("../../helpers/jwt");
const protect = require("../../middlewares/protect");


var router = express.Router();

router.post(
    '/validate',
    protect,
    async (req, res, next) => {
        try {
            validateErrors(req);

            const user = await User.findOne({
                where: {
                    id: req.user.id
                }
            });

            if(!user) 
                throw new ValidationError(403, 'Token is invalid');

            return res.sendStatus(200);
        }
        catch (err) {
            next(err)
        }
    }
);

module.exports = router;