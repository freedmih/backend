const { getTasks } = require("../../helpers/fileDB");
const { query, param, validationResult } = require('express-validator');
var express = require('express');
var router = express.Router();

router.get(
    '/',

    query('filterBy').default('all').isIn(['done', 'undone', 'all']),
    query('order').default('asc').isIn(['asc', 'desc']),
    query('page').default(0).isInt(),
    query('pp').default(5).isInt(),

    async function (req, res) {

        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { filterBy, order, page, pp } = req.query;
        const tasks = await getTasks(
            { filterBy, orderBy: order, page, pp } 
        );

        return res.json(tasks);
    }
);

module.exports = router;