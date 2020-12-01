import { type } from 'os'
import { InferActionsTypes } from './redux-store'

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

const dialogsReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'dialog/ADD-MESSAGE':
      let body = action.addNewMessage
      return {
        ...state,
        messages: [...state.messages, { id: 5, message: body }],
      }
    default:
      return state
  }
}

export const actions = {
  addMessageActionCreator: (addNewMessage: string) =>
    ({
      type: 'dialog/ADD-MESSAGE',
      addNewMessage,
    } as const),
}

export default dialogsReducer

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
