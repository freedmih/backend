class ValidationError extends Error {
    constructor(message, httpCode) {
        super(message);
        this.name = "Validation Error";
        this.httpCode = httpCode;
        this.errors = message;
    }
}

module.exports.ValidationError = ValidationError;