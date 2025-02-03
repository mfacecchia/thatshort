import { ErrorRequestHandler } from "express";
import TResponse from "../types/response.type";
import { setJsonResponse } from "../utils/setJsonResponse";

const handleError: ErrorRequestHandler = (err, req, res: TResponse, next) => {
    logError(err);
    // TODO: Handle custom AppError as well
    setJsonResponse(
        res,
        400,
        "An unexpected error occured. Please try again later.",
        {}
    );
    return;
};

function logError(err: Error) {
    if (process.env.NODE_ENV === "development") console.error(err);
}

export { handleError, logError };
