import AppError from "./AppError";

class NotFoundError extends AppError {
    constructor(message: string, cause?: Error) {
        super(message, 400, cause);
        this.name = "NotFoundError";
    }
}

export default NotFoundError;
