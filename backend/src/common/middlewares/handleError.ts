import { ErrorRequestHandler } from "express";
import AppError from "../errors/AppError";
import TResponse, { TDefaultResponseBody } from "../types/response.type";
import { setJsonResponse } from "../utils/setJsonResponse";

const handleError: ErrorRequestHandler = (err, req, res: TResponse, next) => {
    logError(err);
    let jsonResponse: TDefaultResponseBody = {
        status: 400,
        message: "An unexpected error occured. Please try again later.",
        data: {},
    };
    if (err instanceof AppError) {
        jsonResponse.status = err.statusCode;
        jsonResponse.message = err.message;
    }
    setJsonResponse(
        res,
        jsonResponse.status,
        jsonResponse.message,
        jsonResponse.data
    );
    return;
};

function logError(err: Error) {
    if (process.env.NODE_ENV === "development") console.error(err);
}

export { handleError, logError };
