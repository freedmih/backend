class ApiError extends Error {
    constructor(message, httpCode) {
        super(message);
        this.name = "Api Error";
        this.httpCode = httpCode;
        this.errors = [message];
    }
}

module.exports.ApiError = ApiError;