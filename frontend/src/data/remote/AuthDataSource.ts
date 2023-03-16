import LoginCredentials from "./requests/LoginCredentials";
import {apiCall} from "./ApiCall";
import User from "../models/User";
import RegisterCredentials from "./requests/RegisterCredentials";

const loginUser = async (credentials: LoginCredentials) => {
    const user = await apiCall("/auth/login", {
        method: "POST",
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify(credentials)
    })
    return user as User
}

const registerUser = async (credentials: RegisterCredentials) => {
    const user = await apiCall("/auth/register", {
        method: "POST",
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify(credentials)
    })
    return user as User
}

const logoutUser = async () => {
    await apiCall("/auth/logout", {method: "POST"})
}

export {loginUser, registerUser, logoutUser}


