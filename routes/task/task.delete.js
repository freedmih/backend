const { param, body, validationResult } = require('express-validator');
var express = require('express');
const { ApiError } = require("../../helpers/error");
var router = express.Router();

router.delete(
    '/:uuid',

    param('uuid').isUUID(4),

    async function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { uuid } = req.params;
        
        try {
            const count = await Task.destroy({
                where: { uuid }
            });

            if (count > 0) {
                return res.status(204).end();
            }

            throw new ApiError("Task not found", 404);
        }
        catch(err) {
            next(err)
        }
    }
);

module.exports = router;