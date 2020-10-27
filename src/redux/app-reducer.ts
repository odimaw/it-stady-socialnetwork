import { getAuthUserData } from './auth-reducer'

const INITIALIZED_SUCCESS = 'app/SET_INITIALIZED'

export type InitialStateType = {
  initialized: boolean
}

let initialState: InitialStateType = {
  initialized: false,
}

const appReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      }

    default:
      return state
  }
}

type initializedSuccessActionType = {
  type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): initializedSuccessActionType => ({
  type: INITIALIZED_SUCCESS,
})

export const initializeApp = () => {
  return (dispatch: any) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise]).then(() => {
      dispatch(initializedSuccess())
    })
  }
}

export default appReducer
