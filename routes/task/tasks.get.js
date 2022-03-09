const { getTasks } = require("../../helpers/dbHelper");
const { query, param, validationResult } = require('express-validator');
var express = require('express');
const { ValidationError } = require("../../helpers/error");
const { Task } = require("../../models/task.model");
const { filterTasks, orderTasks, sliceTasks } = require("../../helpers/tasks");
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

            const tasks = await Task.findAll();

            const filtered = filterTasks(tasks, filterBy);
            const ordered = orderTasks(filtered, order);
            const sliced = sliceTasks(ordered, pp, page);

            return res.json(sliced);    
        }
        catch(err) {
            next(err);
        }
    }
);

module.exports = router;