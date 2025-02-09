import AppError from "./AppError";

class DatabaseConnectionError extends AppError {
    constructor(message: string, cause?: Error) {
        super(message, 400, cause);
        this.name = "DatabaseConnectionError";
    }
}

export default DatabaseConnectionError;
