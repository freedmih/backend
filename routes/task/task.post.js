const { addTask } = require("../../helpers/fileDB");
const { body, validationResult } = require('express-validator');
var express = require('express');
var router = express.Router();

router.post(
    '/',
    body('name').isLength({ max: 20 }),
    body('done').isBoolean(),
    body('createdAt').optional().isDate(),

    async function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, done, createdAt } = req.body;

        const uuid = await addTask({ name, done, createdAt });

        return res.send(uuid);
    }
);

module.exports = router;