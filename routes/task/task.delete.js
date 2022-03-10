const { param, body, validationResult } = require('express-validator');
var express = require('express');
const { ApiError } = require("../../errors/apiError");
const { ValidationError } = require("../../errors/validationError");
const { Task } = require("../../models/task.model");
const validateErrors = require("../../errors/errorWrapper");
var router = express.Router();

router.delete(
    '/:uuid',

    param('uuid').isUUID(4),

    async (req, res, next) => {
        const { uuid } = req.params;

        try {
            validateErrors(req);

            const count = await Task.destroy({
                where: { uuid }
            });

            if (count === 0)
                throw new ApiError("Task not found", 404);

            return res.sendStatus(204);
        }
        catch (err) {
            next(err)
        }
    }
);

module.exports = router;