import {RequestHandler} from "express";
import {getUserById} from "../data/datasource/UserDataSource";

export const getAuthenticatedUser:RequestHandler = async(req, res, next) => {
    try{
        const userId = req.session.userId
        const user = getUserById(userId!)

        res.status(200).json(user)
    }catch(error){
        next(error)
    }
}