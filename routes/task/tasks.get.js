const { getTasks } = require("../../db/memory");
const { query, param, validationResult } = require('express-validator');
var express = require('express');
var router = express.Router();

router.get(
    '/',

    query('filterBy').default('all').isIn(['done', 'undone']),
    query('order').default('asc').isIn(['asc', 'desc']),
    query('page').default(1).isInt(),
    query('pp').default(1).isInt(),

    async function (req, res) {

        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { filterBy, order, page, pp } = req.params;
        const tasks = await getTasks({
            filterBy, order, page, pp
        });

        return res.json(tasks);
    }
);

module.exports = router;