import axios from "axios"

// init('123')
// callApi({url: '123', method: 'GET'})

const BASE_URL = 'https://us-central1-cryptomarket-f8943.cloudfunctions.net'

// class ApiConfig {
//     static instance = null

//     static init = (userId) => {
//         instance = axios.create({
//             baseURL: BASE_URL,
//             timeout: 10000,
//             headers: {
//                 user_id: userId
//             }
//           });
//     }

//     static callApi = async ({
//         method,
//         url,
//     }) => {
//         return await instance.request({
//             method,
//             url,
//         })
//     }
// }

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