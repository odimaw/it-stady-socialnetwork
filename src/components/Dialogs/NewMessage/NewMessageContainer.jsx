import React from 'react';
import s from './NewMessage.module.css';
import { addMessageActionCreator, updateNewMessageBodyCreator } from '../../../redux/dialogs-reducer';
import NewMessage from './NewMessage';
// import StoreContext from '../../../StoreContext';
import { connect } from 'react-redux';

// const NewMessageContainer = () => {

//   return <StoreContext.Consumer> 
//     {
//     (store) => {
//       let addMessage = () => {
//         store.dispatch(addMessageActionCreator());
//       }

//       let onMessageChange = (body) => {
//         store.dispatch(updateNewMessageBodyCreator(body));
//       }

//       return <NewMessage updateNewMessageBodyCreator={onMessageChange}
//         addMessageActionCreator={addMessage}
//         newMessage={store.getState().dialogsPage.newMessage} />
//     }
//   }
//   </StoreContext.Consumer>
// };

let mapStateToProps = (state) => {
  return {
    newMessage: state.dialogsPage.newMessage,
  }
}
let mapDispatchToProps = (dispatch) => {
  return {
    updateNewMessageBodyCreator: (body) => {
      dispatch(updateNewMessageBodyCreator(body));
    },
    addMessageActionCreator: () => {
      dispatch(addMessageActionCreator());
    },
  }
}
const NewMessageContainer = connect(mapStateToProps, mapDispatchToProps) (NewMessage);

export default NewMessageContainer;
