class HttpError extends Error{

    constructor(message: string) {
        super(message);
        this.name = this.constructor.name
    }
}

export class NotAuthenticatedError extends HttpError{}