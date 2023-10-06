class ErrorHandling extends Error {
    code:number;
    message: string;
    constructor(message:string, code:number) {
        super(message);
        this.message = message;
        this.code = code;
        Error.captureStackTrace(this, this.constructor);
    }
}