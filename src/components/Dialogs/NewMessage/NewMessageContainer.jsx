import React from 'react';
import s from './NewMessage.module.css';
import { addMessageActionCreator, updateNewMessageBodyCreator } from '../../../redux/dialogs-reducer';
import NewMessage from './NewMessage';

const NewMessageContainer = (props) => {

  // let newPostElement = React.createRef();

  let addMessage = () => {
    props.store.dispatch(addMessageActionCreator());
  }

  let onMessageChange = (body) => {
    props.store.dispatch(updateNewMessageBodyCreator(body));
  }

  return <NewMessage updateNewMessageBodyCreator={onMessageChange}
  addMessageActionCreator={addMessage}
  newMessage={props.store.getState().dialogsPage.newMessage}/>
};

export default NewMessageContainer;
