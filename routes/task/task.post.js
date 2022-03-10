const { body, validationResult } = require('express-validator');
var express = require('express');
const { Task } = require("../../models/index");

const { ApiError } = require("../../errors/apiError");
const validateErrors = require("../../errors/errorWrapper");
var router = express.Router();

router.post(
    '/',

    body('name').isLength({ min: 1, max: 50 }),
    body('done').default(false).isBoolean(),

    async (req, res, next) => {
        validateErrors(req);

        const { name, done } = req.body;

        try {
            const task = await Task.create({
                name, done
            })

            return res.json({
                uuid: task.uuid
            });
        }
        catch (err) {
            next(err);
        }
    }
);

module.exports = router;