class ValidationError extends Error {
    constructor(message, httpCode) {
        super(message);
        this.name = "Validatinon Error";
        this.httpCode = httpCode;
    }
}

module.exports.ValidationError = ValidationError;