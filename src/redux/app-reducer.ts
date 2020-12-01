import { InferActionsTypes } from './redux-store'
import { getAuthUserData } from './auth-reducer'

let initialState = {
  initialized: false,
}

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
const appReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case 'app/SET_INITIALIZED':
      return {
        ...state,
        initialized: true,
      }

    default:
      return state
  }
}

export const actions = {
  initializedSuccess: () => ({
    type: 'app/SET_INITIALIZED' as const,
  }),
}

export const initializeApp = () => {
  return (dispatch: any) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise]).then(() => {
      dispatch(actions.initializedSuccess())
    })
  }
}

export default appReducer
