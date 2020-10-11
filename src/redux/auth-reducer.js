import { authAPI, securityAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    captchaURL: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }

        default:
            return state;
    }
}

export const setAuthUserData = (id, login, email, isAuth) => ({
    type: SET_USER_DATA,
    payload: {
        id,
        login,
        email,
        isAuth
    }
})

export const getCaptchaUrlSuccess = (captchaURL) => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: { captchaURL }
})

export const getAuthUserData = () => async (dispatch) => {
    let response = await authAPI.me();
    if (response.resultCode === 0) {
        let { id, login, email } = response.data;
        dispatch(setAuthUserData(id, login, email, true));
    }
}


export const login = (email, password, rememberMe, captcha) => {
    return async (dispatch) => {
        let response = await authAPI.login(email, password, rememberMe, captcha);
        if (response.resultCode === 0) {
            dispatch(getAuthUserData());
        } else  {
            if (response.resultCode === 10) {
                dispatch(getCaptcha());
            }
            let message = response.messages.length > 0 ? response.messages[0] : 'Some error';
            dispatch(stopSubmit('login', { _error: message }));
        }
    };
}

export const getCaptcha = () => {
    return async (dispatch) => {
        const response = await securityAPI.getCaptchaUrl();
        const captchaURL = response.url;
            dispatch(getCaptchaUrlSuccess(captchaURL));
            debugger;
    };
}

export const logout = () => {
    return async (dispatch) => {
        let response = await authAPI.logout();
        if (response.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }
    };
}


export default authReducer;