import AppError from "./AppError";

class GenericAppError extends AppError {
    constructor(
        message: string,
        statusCode: number,
        name: string,
        cause?: Error
    ) {
        super(message, statusCode, cause);
        this.name = name || "GenericAppError";
    }
}

export default GenericAppError;
