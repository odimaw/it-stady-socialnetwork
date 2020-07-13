import React from 'react';
import s from './NewMessage.module.css';
import { addMessageActionCreator, updateNewMessageBodyCreator } from '../../../redux/dialogs-reducer';

const NewMessage = (props) => {

  // let newPostElement = React.createRef();

  let addMessage = () => {
    props.addMessageActionCreator();
  }

  let onMessageChange = (e) => {
    let body = e.target.value;
    props.updateNewMessageBodyCreator(body);
  }

  return (<div className={s.postsBlock}>
    <h3>My message</h3>
    <div>
      <div>
        <textarea
          // ref={newPostElement}
          onChange={onMessageChange}
          value={props.newMessage}
          placeholder='Enter your message'></textarea></div>
      <div><button onClick={addMessage}>Add message</button></div>
    </div>

  </div>)
};

export default NewMessage;
