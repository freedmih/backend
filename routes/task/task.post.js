const { body, validationResult } = require('express-validator');
const express = require('express');
const { Task } = require("../../models/index");
const protect = require("../../middlewares/protect");
const { ApiError } = require("../../errors/apiError");
const validateErrors = require("../../errors/errorWrapper");
const router = express.Router();

router.post(
    '/task',
    protect,
    body('name').isLength({ min: 1, max: 50 }),
    body('done').default(false).isBoolean(),

    async (req, res, next) => {
        validateErrors(req);

        const { name, done } = req.body;
        const user = req.user;

        try {
            const task = await Task.create({
                name, done, UserId: user.id
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