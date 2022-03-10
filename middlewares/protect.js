const { validateAccessToken } = require("../helpers/jwt");

module.exports = async (req, res, next) => {
    try {
        const user = validateAccessToken(req);
        req.user = {
            username: user.username,
            id: user.id
        };
    }
    catch (err) {
        req.errors = [err.message];
        next(err)
    }
    next();
}