import {RequestHandler} from "express";
import LoginRequest from "../data/models/requests/LoginRequest";
import createHttpError from "http-errors";
import {createUser, getUser} from "../data/datasource/UserDataSource";
import RegisterRequest from "../data/models/requests/RegisterRequest";

export const login: RequestHandler<unknown, unknown, LoginRequest, unknown> = async (req, res, next) => {
    try {
        const {email, password} = req.body

        if (!email) throw createHttpError(400, "Login Request must have an email")
        if (!password) throw createHttpError(400, "Login Request must have a password")

        const user = await getUser(email, password)

        req.session.userId = user._id

        res.status(200).json(user)

    } catch (error) {
        next(error)
    }
}

export const register: RequestHandler<unknown, unknown, RegisterRequest, unknown> = async (req, res, next) => {
    try {
        const {username, email, password} = req.body

        if (!username) throw createHttpError(400, "Register Request must have a username")
        if (!email) throw createHttpError(400, "Register Request must have an email")
        if (!password) throw createHttpError(400, "Register Request must have a password")

        const user = await createUser(username, email, password)

        req.session.userId = user._id

        res.status(200).json(user)

    } catch (error) {
        next(error)
    }
}

export const logout: RequestHandler = (req, res, next) => {
    req.session.destroy(error => {
        if (error) next(error)
        else res.status(200).json({
            statusCode: 200,
            message: "User successfully logged out"
        })
    })
}