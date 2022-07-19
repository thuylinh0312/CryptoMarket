import axios from "axios"

const BASE_URL = 'https://us-central1-cryptomarket-f8943.cloudfunctions.net'

let instance = null

init = (userId) => {
    instance = axios.create({
        baseURL: BASE_URL,
        timeout: 10000,
        headers: {
            user_id: userId
        }
    });
}

callApi = async ({
    
    method,
    url,
    data,
}) => {
    const result = await instance.request({
        
        method,
        url,
        data,
    })
    return result.data
}

export const ApiUtil = {init, callApi}