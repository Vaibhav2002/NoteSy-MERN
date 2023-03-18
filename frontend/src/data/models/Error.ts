class HttpError extends Error{

    constructor(message: string) {
        super(message);
        this.name = this.constructor.name
    }
}

/**
 * 401 User Not Authenticated Error
 */
export class NotAuthenticatedError extends HttpError{}

/**
 * 400 Bad Request Error
 */
export class BadRequestError extends HttpError {}