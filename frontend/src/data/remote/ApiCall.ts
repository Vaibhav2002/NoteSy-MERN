import {BadRequestError, NotAuthenticatedError} from "../models/Error";

export const apiCall = async (input: RequestInfo, init?: RequestInit) => {
    const response = await fetch(`/api${input}`, init)
    if (!response.ok) {
        const error = await response.json()
        switch (error.status) {
            case '400':
                throw new BadRequestError(error.message)
            case '401':
                throw new NotAuthenticatedError(error.message)
            default:
                throw Error(error.message)
        }
    }
    return await response.json()
}