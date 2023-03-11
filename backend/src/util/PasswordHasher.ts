import bcrypt from "bcrypt"
import cleanEnv from "./validateEnv";

const hashPassword = async (rawPass:string) => bcrypt.hash(rawPass, cleanEnv.PWD_HASHING_ROUNDS)

const comparePasswords = async (rawPass:string, hashedPass:string) => bcrypt.compare(rawPass, hashedPass)

export {hashPassword, comparePasswords}