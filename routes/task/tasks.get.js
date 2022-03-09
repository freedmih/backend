const { getTasks } = require("../../helpers/dbHelper");
const { query, param, validationResult } = require('express-validator');
var express = require('express');
const { ValidationError } = require("../../helpers/error");
var router = express.Router();

router.get(
    '/',

    query('filterBy').default('all').isIn(['done', 'undone', 'all']),
    query('order').default('asc').isIn(['asc', 'desc']),
    query('page').default(0).isInt(),
    query('pp').default(5).isInt(),

    async function (req, res, next) {

        const errors = validationResult(req);

        const { filterBy, order, page, pp } = req.query;

        try {
            if(!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            var tasks = await getTasks(
                { filterBy, orderBy: order, page, pp } 
            );

            return res.json(tasks);    
        }
        catch(err) {
            next(err);
        }
    }
);

module.exports = router;