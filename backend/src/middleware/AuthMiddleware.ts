import {RequestHandler} from "express";
import createHttpError from "http-errors";

const authMiddleware:RequestHandler = (req, res, next) => {
    if(req.session.userId)
        next()
    else
        throw createHttpError(401, "User Not Authenticated")
}

export default authMiddleware