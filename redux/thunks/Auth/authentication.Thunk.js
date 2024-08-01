import requestApi from '../../../utils/request'
import {
    signInRequest,
    signInSuccess,
    signInFailure,
    forgotpassRequest,
    forgotpassSuccess,
    forgotpassFailure,
    resetPassFailure,
    resetPassSuccess,
    resetPassRequest,
    logOutUserRequest,
    logOutUserSuccess,
    logOutUserFailure
} from '../../slices/Auth/authentication'
import { sweetalert }  from '../../../common/common'


export const signIn = (payload, callback) => async (dispatch) => {
    try {
        dispatch(signInRequest())
        const data = await requestApi.post('/user/login', payload)
        dispatch(signInSuccess(data))
        if (typeof callback === "function") {
            callback(data?.data)
        }
    } catch (error) {
        sweetalert({
            message: error?.message,
            type: 'error'
        })
        dispatch(signInFailure())
    }
}

export const forgotPassword = (payload, callback) => async (dispatch) => {
    try {
        dispatch(forgotpassRequest())
        const data = await requestApi.post('/user/forgot-password', payload)
        dispatch(forgotpassSuccess())
        if (typeof callback === "function") {
            callback(data)
        }
    } catch (error) {
        sweetalert({
            message: error?.message,
            type: 'error'
        })
        dispatch(forgotpassFailure())
    }
}

export const resetPassword = (payload, callback) => async (dispatch) => {
    try {
        dispatch(resetPassRequest())
        const data = await requestApi.post('/user/reset-password', payload)
        dispatch(resetPassSuccess())
        if (typeof callback === "function") {
            callback()
        }
    } catch (error) {
        sweetalert({
            message: error?.message,
            type: 'error'
        })
        dispatch(resetPassFailure())
    }
}

export const logOutUser = (payload, callback) => async (dispatch) => {
    try {
        dispatch(logOutUserRequest())
        const data = await requestApi.post(`/user/logout`, payload)
        dispatch(logOutUserSuccess(data))
        if (typeof callback === "function") {
            callback()
            window.location.reload(true)
        }
        localStorage.removeItem('userDataSSM')
        localStorage.removeItem('languageSSM')
    }
    catch (error) {
        sweetalert({
            message: error?.message,
            type: 'error'
        })
        dispatch(logOutUserFailure())
    }
}
