import UserModel from "../models/entities/UserEntity"
import createHttpError from "http-errors";
import {comparePasswords, hashPassword} from "../../util/PasswordHasher";
import mongoose from "mongoose";

export const createUser = async (username:string, email:string, password:string) => {

    if(await getUserByUsername(username)) throw createHttpError(400, "Username already in use")
    if(await getUserByEmail(email)) throw createHttpError(400, "Email already in use")

    const hashedPwd = await hashPassword(password)

    const user = await UserModel.create({
        username: username,
        email:email,
        password: hashedPwd
    })

    return user
}

export const getUser = async(email:string, password:string) => {

    const user = await getUserByEmail(email, "+email +password")
    if(!user) throw createHttpError(400, "User with this email does not exist")

    const arePasswordsSame = await comparePasswords(password, user.password!)
    if(!arePasswordsSame) throw createHttpError(400, "Passwords do not match")

    return user
}

export const getUserById = async(userId:mongoose.Types.ObjectId) => {
    return UserModel.findById(userId).select("+email").exec()
}

const getUserByEmail = async (email:string, additional:string = "") => {
    return UserModel.findOne({email: email}).select(additional).exec()
}

const getUserByUsername= async (username:string, additional:string = "") => {
    return UserModel.findOne({username: username}).select(additional).exec()
}