class AuthError extends Error {
    constructor(message, httpCode) {
        super(message);
        this.name = "Auth Error";
        this.httpCode = httpCode;
        this.errors = [message];
    }
}

module.exports.AuthError = AuthError;