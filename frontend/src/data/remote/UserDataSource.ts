import {apiCall} from "./ApiCall";
import User from "../models/User";

const getAuthenticatedUser = async () => {
    return await apiCall("/user",{
        method: "GET",
        headers: {'Content-Type': "application/json"},
    }) as User
}

export {getAuthenticatedUser}