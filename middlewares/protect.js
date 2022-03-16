const { validateAccessToken } = require("../helpers/jwt");
const { User } = require("../models/index");
const { ApiError } = require("../errors/apiError");

module.exports = async (req, res, next) => {
    try {
        const user = validateAccessToken(req, res);

        if (!await User.findOne({
            where: {
                id: user.id
            }
        })) {
            throw new ApiError('user_not_found', 401);
        }

            req.user = {
                id: user.id
            };
    }
    catch (err) {
        req.errors = [err.message];
        next(err)
    }
    next();
}