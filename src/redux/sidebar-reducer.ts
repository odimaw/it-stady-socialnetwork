import { act } from 'react-dom/test-utils'

let initialState = {}
type InitialStateType = typeof initialState

const sidebarReducer = (state = initialState, action: any) => {
  return state
}

export default sidebarReducer
