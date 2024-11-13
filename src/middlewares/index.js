"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = exports.errorHandler = void 0;
class AppError extends Error {
    constructor(message, statusCode, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}
const errorHandler = (err, req, res, next) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json(Object.assign({ status: "error", message: err.message }, (process.env.NODE_ENV !== "production" && { stack: err.stack })));
    }
    console.error('Unexpected Error:', err);
    return res.status(500).json(Object.assign({ status: "error", message: "Internal Server Error" }, (process.env.NODE_ENV !== "production" && { stack: err.stack })));
};
exports.errorHandler = errorHandler;
const catchAsync = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
exports.catchAsync = catchAsync;
//# sourceMappingURL=index.js.map