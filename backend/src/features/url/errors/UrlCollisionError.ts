import AppError from "../../../common/errors/AppError";

class UrlCollisionError extends AppError {
    constructor(message: string, cause?: Error) {
        super(message, 400, cause);
        this.name = "UrlCollisionError";
    }
}

export default UrlCollisionError;
