'use client'
import axios from 'axios'
import Swal from 'sweetalert2'
import { sanitizePayload } from './sanitize'

const requestApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_HOST
})

// const currentUserContext = useUserInfo()

requestApi.interceptors.request.use((req) => {
    // const authToken = JSON.parse(localStorage.getItem('authToken'))

    /////////
    function getCookie(name) {
        const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return cookieValue ? cookieValue.pop() : '';
    }
    // Get the value of the 'authToken' cookie
    const authToken = getCookie('authTokenSSM') || ''
    const getLanguage = getCookie('languageSSM') || 'it'
    // console.log(getLanguage ? getLanguage : "en","77777777777777");
    // console.log(authToken,'//////////');
    // const authToken = JSON.parse(localStorage.getItem("seller_tokenData"));
    /////////
    // console.log(authToken,"authToken");

    // console.log(req,"req?.data?.authToken");

    if (authToken || req?.data?.mobileToken) {
        let tokens = req?.data?.mobileToken ?? ''
        // console.log('tokens', req?.data)
        // console.log('tokens', tokens)
        let newtoken = tokens ? tokens : authToken
        // console.log('newtoken', newtoken)
        // let newtoken = authToken ?? tokens
        req.headers = {
            Authorization: "Bearer " + newtoken,
            'language': getLanguage ? getLanguage : "it",
            devicetype: 'web',
        }
    } else {
        req.headers = {
            'language': getLanguage ? getLanguage : "it",
            devicetype: 'web'
        }
    }
    // if (authToken) {
    //     req.headers = {
    //         Authorization: `Bearer ${authToken}`
    //     }
    // }

    if (req.data?.mobileToken) {
        const { mobileToken, ...rest } = req.data
        req.data = rest
    }

    if (req.data) {
        // Check if the payload is an array
        if (req.data instanceof FormData) {
            // No need to sanitize FormData
            // Return the req as is
            return req
        } else {
            if (req.data) {
                req.data = sanitizePayload(req.data)
            }
        }
    }

    return Promise.resolve(req)
})
requestApi.interceptors.response.use(
    (response) => {
        const { data } = response
        if (data?.meta?.status === 1) {
            return Promise.resolve(data)
        } else {
            return Promise.reject({
                status: data?.statusCode,
                message: data?.meta?.message
            })
        }
    },
    async (error) => {
        if (error?.response?.status === 401) {
            localStorage.removeItem('userData')
            document.cookie = 'authTokenSSM=; expires=Thu, 01 Jan 1970 00:00:00 GMT ; path=/;';
            document.cookie = 'userTypeSSM=; expires=Thu, 01 Jan 1970 00:00:00 GMT ; path=/;';
            localStorage.removeItem('authTokenSSM')
            await Swal.fire({
                position: 'center',
                icon: 'error',
                title: '',
                allowOutsideClick: false,
                text: 'Your session has been expired. please login again'
            }).then(() => {
                // currentUserContext.setCurrentUser(null)
                window.location.href = window.location.origin;
                return true
            })
            return true
        } else {
            const response = {
                message: 'Something went to wrong.',
                status: 404
            }
            if (
                error?.response?.status === 400 ||
                error?.response?.status === 500
            ) {
                response.message = error?.response?.data?.meta?.message
                response.status = error?.response?.data?.statusCode
                return Promise.reject(response)
            }

            if (error?.meta) {
                response.message = error?.meta?.message
            } else {
                if (error?.status !== 404 || error?.statusCode !== 404) {
                    if (error?.status || error?.statusCode) {
                        response.message = error?.message
                        response.status = error?.status || error?.statusCode
                    } else {
                        response.message = 'Service Unavailable.'
                        response.status = 503
                    }
                }
            }

            if (error?.meta) {
                response.message = error?.meta?.message
            } else {
                if (error?.response?.status === 403) {
                    localStorage.removeItem('userData')
                    document.cookie = 'authTokenSSM=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
                    document.cookie = 'userTypeSSM=; expires=Thu, 01 Jan 1970 00:00:00 GMT ; path=/;';
                    localStorage.removeItem('authTokenSSM')
                    window.location.reload()
                    return true
                }
            }

            return Promise.reject(response)
        }
    }
)

export default requestApi
