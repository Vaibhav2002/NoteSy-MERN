
const baseUrl = process.env.REACT_APP_BACKEND_URL
export const apiCall = async (input:RequestInfo, init?:RequestInit) => {
    const response = await fetch(`${baseUrl}${input}`, init)
    if(!response.ok) {
        const error = await response.json()
        throw Error(error.error)
    }

    return await response.json()
}