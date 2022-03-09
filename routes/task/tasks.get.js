const { query, validationResult } = require('express-validator');
var express = require('express');

const { Task } = require("../../models/task.model");
var router = express.Router();

const getFilterByName = filter => {
    if (filter === 'done')
        return { done: true }
    
    if(filter === 'undone')
        return { done: false }

    return {};
};

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
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            
            const tasks = await Task.findAll({
                where: getFilterByName(filterBy),
                order: [['createdAt', order]],
                limit: pp,
                offset: page * pp
            });

            return res.json(tasks);
        }
        catch (err) {
            next(err);
        }
    }
);

module.exports = router;