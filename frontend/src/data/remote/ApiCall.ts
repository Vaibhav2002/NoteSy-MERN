import {NotAuthenticatedError} from "../models/Error";

export const apiCall = async (input: RequestInfo, init?: RequestInit) => {
    const response = await fetch(`/api${input}`, init)
    if (!response.ok) {
        const error = await response.json()
        if (error.status === '401')
            throw new NotAuthenticatedError(error.message)
        else throw Error(error.message)
    }

    return await response.json()
}