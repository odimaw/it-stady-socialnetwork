import { type } from 'os'
const ADD_MESSAGE = 'dialog/ADD-MESSAGE'

type DialogType = {
  id: number
  name: string
}
type MessageType = {
  id: number
  message: string
}
let initialState = {
  messages: [
    { id: 1, message: 'Hi' },
    { id: 2, message: 'How is your it-kamasutra?' },
    { id: 3, message: 'Yo' },
    { id: 4, message: 'Yo' },
    { id: 5, message: 'Yo' },
    { id: 6, message: 'Yo' },
  ] as Array<MessageType>,
  dialogs: [
    { id: 1, name: 'Dimych' },
    { id: 2, name: 'Andrey' },
    { id: 3, name: 'Sveta' },
    { id: 4, name: 'Viktor' },
    { id: 5, name: 'Sasha' },
    { id: 6, name: 'Valera' },
  ] as Array<DialogType>,
}

export type InitialStateType = typeof initialState
const dialogsReducer = (
  state = initialState,
  action: any
): InitialStateType => {
  switch (action.type) {
    case ADD_MESSAGE:
      let body = action.addNewMessage
      return {
        ...state,
        messages: [...state.messages, { id: 5, message: body }],
      }
    default:
      return state
  }
}
type addNewMessageActionType = {
  type: typeof ADD_MESSAGE
  addNewMessage: string
}

export const addMessageActionCreator = (
  addNewMessage: string
): addNewMessageActionType => ({
  type: ADD_MESSAGE,
  addNewMessage,
})

export default dialogsReducer
