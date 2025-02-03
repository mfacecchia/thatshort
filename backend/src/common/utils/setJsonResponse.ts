import TResponse from "../types/response.type";

/**
 * Basically sets the JSON response according to standard
 * fields defined in {@link TResponse}.
 * @param res the response Object which will be appended the response to
 * @param statusCode the status code
 * @param message the message which will be displayed to the user
 * @param data the data which will be sent to the user.
 * If empty set to an empty Object
 */
function setJsonResponse(
    res: TResponse,
    statusCode: number,
    message: string,
    data: Record<string, unknown>
): void {
    res.status(statusCode).json({
        status: statusCode,
        message: message,
        data: data,
    });
    return;
}

export { setJsonResponse };
