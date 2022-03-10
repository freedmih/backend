const { validationResult } = require('express-validator');

const validateErrors = req => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ValidationError(errors.array(), 400);
    }
}

module.exports = validateErrors;