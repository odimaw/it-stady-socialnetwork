import { ResultCodesEnum, ResultCodeForCaptchaEnum } from './../api/api'
import { authAPI } from '../api/auth-api'
import { FormAction, stopSubmit } from 'redux-form'
import { type } from 'os'
import { securityAPI } from '../api/security-api'
import { BaseThunkType, InferActionsTypes } from './redux-store'
import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'

let initialState = {
  id: null as number | null,
  login: null as string | null,
  email: null as string | null,
  isAuth: false,
  captchaURL: null as string | null,
}

const authReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'auth/SET_USER_DATA':
    case 'auth/GET_CAPTCHA_URL_SUCCESS':
      return {
        ...state,
        ...action.payload,
      }

    default:
      return state
  }
}

export const actions = {
  setAuthUserData: (
    id: number | null,
    login: string | null,
    email: string | null,
    isAuth: boolean
  ) =>
    ({
      type: 'auth/SET_USER_DATA',
      payload: {
        id,
        login,
        email,
        isAuth,
      },
    } as const),
  getCaptchaUrlSuccess: (captchaURL: string) =>
    ({
      type: 'auth/GET_CAPTCHA_URL_SUCCESS',
      payload: { captchaURL },
    } as const),
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  let response = await authAPI.me()
  if (response.resultCode === ResultCodesEnum.Success) {
    let { id, login, email } = response.data
    dispatch(actions.setAuthUserData(id, login, email, true))
  }
}

export const login = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string
): ThunkType => {
  return async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.resultCode === ResultCodesEnum.Success) {
      dispatch(getAuthUserData())
    } else {
      if (response.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
        dispatch(getCaptcha())
      }
      let message =
        response.messages.length > 0 ? response.messages[0] : 'Some error'
      dispatch(stopSubmit('login', { _error: message }))
    }
  }
}

export const getCaptcha = (): ThunkType => {
  return async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaURL = response.url
    dispatch(actions.getCaptchaUrlSuccess(captchaURL))
  }
}

export const logout = (): ThunkType => {
  return async (dispatch: any) => {
    let response = await authAPI.logout()
    if (response.resultCode === 0) {
      dispatch(actions.setAuthUserData(null, null, null, false))
    }
  }
}

export default authReducer

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>
