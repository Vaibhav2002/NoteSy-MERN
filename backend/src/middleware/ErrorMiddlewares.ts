import {NextFunction, Request, RequestHandler, Response} from "express";
import createHttpError, {isHttpError} from "http-errors";

const notFoundMiddleware: RequestHandler = (req, res, next) => {
    next(createHttpError(404, "Endpoint Not found"))
}

const errorMiddleware = (error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.log(error)
    let errMessage = "An Unknown error occurred"
    let statusCode = 500
    if (isHttpError(error)) {
        errMessage = error.message
        statusCode = error.statusCode
    }
    res.status(statusCode).json({ code: statusCode, error: errMessage})
}

export { notFoundMiddleware, errorMiddleware }