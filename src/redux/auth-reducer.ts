import { ResultCodesEnum, ResultCodeForCaptcha } from './../api/api'
import { authAPI, securityAPI } from '../api/api'
import { stopSubmit } from 'redux-form'
import { type } from 'os'

const SET_USER_DATA = 'auth/SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS'

let initialState = {
  id: null as number | null,
  login: null as string | null,
  email: null as string | null,
  isAuth: false,
  captchaURL: null as string | null,
}

export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SET_USER_DATA:
    case GET_CAPTCHA_URL_SUCCESS:
      return {
        ...state,
        ...action.payload,
      }

    default:
      return state
  }
}

type setAuthUserDataActionTypePayloadType = {
  id: number | null
  login: string | null
  email: string | null
  isAuth: boolean
}

type setAuthUserDataActionType = {
  type: typeof SET_USER_DATA
  payload: setAuthUserDataActionTypePayloadType
}

export const setAuthUserData = (
  id: number | null,
  login: string | null,
  email: string | null,
  isAuth: boolean
): setAuthUserDataActionType => ({
  type: SET_USER_DATA,
  payload: {
    id,
    login,
    email,
    isAuth,
  },
})

type getCaptchaUrlSuccessActionType = {
  type: typeof GET_CAPTCHA_URL_SUCCESS
  payload: { captchaURL: string }
}

export const getCaptchaUrlSuccess = (
  captchaURL: string
): getCaptchaUrlSuccessActionType => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaURL },
})

export const getAuthUserData = () => async (dispatch: any) => {
  let response = await authAPI.me()
  if (response.resultCode === ResultCodesEnum.Success) {
    let { id, login, email } = response.data
    dispatch(setAuthUserData(id, login, email, true))
  }
}

export const login = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string
) => {
  return async (dispatch: any) => {
    let response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.resultCode === ResultCodesEnum.Success) {
      dispatch(getAuthUserData())
    } else {
      if (response.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
        dispatch(getCaptcha())
      }
      let message =
        response.messages.length > 0 ? response.messages[0] : 'Some error'
      dispatch(stopSubmit('login', { _error: message }))
    }
  }
}

export const getCaptcha = () => {
  return async (dispatch: any) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaURL = response.url
    dispatch(getCaptchaUrlSuccess(captchaURL))
  }
}

export const logout = () => {
  return async (dispatch: any) => {
    let response = await authAPI.logout()
    if (response.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false))
    }
  }
}

export default authReducer
