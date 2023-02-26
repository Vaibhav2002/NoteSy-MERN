export const apiCall = async (input:RequestInfo, init?:RequestInit) => {
    const response = await fetch(input, init)
    if(!response.ok) {
        const error = await response.json()
        throw Error(error.error)
    }

    return await response.json()
}