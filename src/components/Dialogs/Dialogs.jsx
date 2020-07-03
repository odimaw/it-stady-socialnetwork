import React from 'react';
import s from './Dialogs.module.css';
import { NavLink } from "react-router-dom";
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import NewMessage from './NewMessage/NewMessage'

const Dialogs = (props) => {

    let myFriends = props.state.myFriends.friends
        .map(d => <DialogItem name={d.name} id={d.id} avatar={d.avatar} />);
    let messagesElements = props.state.dialogsPage.messages
        .map(m => <Message message={m.message} id=''/>);
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {myFriends}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
            <div>
                <NewMessage 
                 newMessage={props.dialogsPage.newMessage} 
                 updateNewMessageText = { props.updateNewMessageText }
                 addMessage = { props.addMessage } />
            </div>
        </div>
    )
}

export default Dialogs;