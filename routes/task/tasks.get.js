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
    query('filterBy').default('all').isIn(['done', 'undone', 'all']).withMessage('filter_validation'),
    query('order').default('asc').isIn(['asc', 'desc']).withMessage('order_validation'),
    query('page').default(1).isInt().withMessage('page_validation'),
    query('pp').default(5).isInt().withMessage('pp_validation'),

    async (req, res, next) => {
        const { filterBy, order, page, pp } = req.query;

        const userId = res.locals.userId;

        try {
            validateErrors(req, res);

            const tasks = await Task.findAll({
                where: { ...getFilterByName(filterBy),
                    user_id: userId
                },
                order: [['createdAt', order]],
                limit: pp,
                offset: (page - 1) * pp
            });

            const count = await Task.count({
                where: { ...getFilterByName(filterBy),
                    user_id: userId
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