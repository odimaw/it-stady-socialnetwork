const ADD_MESSAGE = 'dialog/ADD-MESSAGE';

let initialState = {
    messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'How is your it-kamasutra?' },
        { id: 3, message: 'Yo' },
        { id: 4, message: 'Yo' },
        { id: 5, message: 'Yo' },
        { id: 6, message: 'Yo' },
    ],
    dialogs: [
        { id: 1, name: 'Dimych' },
        { id: 2, name: 'Andrey' },
        { id: 3, name: 'Sveta' },
        { id: 4, name: 'Viktor' },
        { id: 5, name: 'Sasha' },
        { id: 6, name: 'Valera' },
    ],
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let body = action.addNewMessage;
            return {
                ...state,
                messages: [...state.messages, { id: 5, message: body, }],
            }
        default:
            return state;
    }

}
export const addMessageActionCreator = (addNewMessage) => ({ type: ADD_MESSAGE, addNewMessage });


export default dialogsReducer;