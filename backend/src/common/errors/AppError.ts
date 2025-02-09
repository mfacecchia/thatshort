class AppError extends Error {
    private _statusCode: number;

    constructor(message: string, statusCode: number, cause?: Error) {
        super(message, { cause: cause });
        this._statusCode = statusCode;
    }

    get statusCode(): number {
        return this._statusCode;
    }

    set statusCode(statusCode: number) {
        this._statusCode = statusCode;
    }
}

export default AppError;
