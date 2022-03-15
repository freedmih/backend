const { query, validationResult } = require('express-validator');
const express = require('express');
const validateErrors = require("../../errors/errorWrapper");
const { Task } = require("../../models/index");
const protect = require("../../middlewares/protect");
const router = express.Router();

const getFilterByName = filter => {
    if (filter === 'done')
        return { done: true }
    
    if(filter === 'undone')
        return { done: false }

    return {};
};

router.get(
    '/tasks',
    protect,
    query('filterBy').default('all').isIn(['done', 'undone', 'all']),
    query('order').default('asc').isIn(['asc', 'desc']),
    query('page').default(1).isInt(),
    query('pp').default(5).isInt(),

    async (req, res, next) => {
        const { filterBy, order, page, pp } = req.query;

        const user = req.user;

        try {
            validateErrors(req);

            const tasks = await Task.findAll({
                where: { ...getFilterByName(filterBy),
                    userId: user.id
                },
                order: [['createdAt', order]],
                limit: pp,
                offset: (page - 1) * pp
            });

            const count = await Task.count({
                where: { ...getFilterByName(filterBy),
                    userId: user.id
                }
            });

            return res.json( {
                count,
                tasks
            });
        }
        catch (err) {
            next(err);
        }
    }
);

module.exports = router;