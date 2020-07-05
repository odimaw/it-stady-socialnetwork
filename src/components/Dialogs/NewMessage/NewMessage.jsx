import React from 'react';
import s from './NewMessage.module.css';

const NewMessage = (props) => {

  let newPostElement = React.createRef();

  let addMessage = () => {
    props.dispatch({ type: 'ADD-MESSAGE', });
  }

  let onMessageChange = () => {
    let text = newPostElement.current.value;
    props.dispatch({
      type: 'UPDATE-NEW-MESSAGE-TEXT',
      newText: text,
    });
  }

  return (<div className={s.postsBlock}>
    <h3>My message</h3>
    <div>
      <div>
        <textarea ref={newPostElement}
          onChange={onMessageChange}
          value={props.newMessage}></textarea></div>
      <div><button onClick={addMessage}>Add message</button></div>
    </div>

  </div>)
};

export default NewMessage;
