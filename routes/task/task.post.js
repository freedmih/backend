const { addTask } = require("../../helpers/dbHelper");
const { body, validationResult } = require('express-validator');
var express = require('express');
const crypto = require("crypto");
const { Task } = require("../../models/task.model");
const { ValidationError } = require("../../helpers/error");
var router = express.Router();

router.post(
    '/',

    body('name').isLength({ max: 20 }),
    body('done').isBoolean(),

    async function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, done } = req.body;

        try {
            const uuid = crypto.randomUUID();

            const task = await Task.create({
                uuid, name, done
            })

            if (task.uuid === uuid) {
                return res.json({
                    uuid
                });
            }
            throw new ValidationError('Task didn\'t create', 500);
        }
        catch (err) {
            next(err);
        }
    }
);

module.exports = router;