import {BadRequestError, NotAuthenticatedError} from "../models/Error";

export const apiCall = async (input: RequestInfo, init?: RequestInit) => {
    const response = await fetch(`/api${input}`, init)
    if (!response.ok) {
        const error = await response.json()
        const errorMessage = error.error
        switch (response.status) {
            case 400:
                throw new BadRequestError(errorMessage)
            case 401:
                throw new NotAuthenticatedError(errorMessage)
            default:
                throw Error(error.message)
        }
    }
    return await response.json()
}