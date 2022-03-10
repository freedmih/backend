const { validateAccessToken } = require("../helpers/jwt");

module.exports = async (req, res, next) => {
    try {
        validateAccessToken(req);
    }
    catch (err) {
        req.errors = [err.message];
    }
    next(req);
}