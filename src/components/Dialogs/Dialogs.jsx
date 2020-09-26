import React from 'react';
import s from './Dialogs.module.css';
import { Redirect } from "react-router-dom";
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import NewMessageContainer from './NewMessage/NewMessageContainer';

const Dialogs = (props) => {

    let myFriends = props.friends
        .map(d => <DialogItem name={d.name} key={d.id} id={d.id} avatar={d.avatar} />);
    let messagesElements = props.messages
        .map(m => <Message message={m.message} key={m.id} id='' />);

    // if (!props.isAuth) return <Redirect to={'/login'} />;

    return (<div className={s.dialogs}>
        <div className={s.dialogsItems}>
            {myFriends}
        </div>
        <div className={s.messages}>
            {messagesElements}
        </div>
        <div>
            <NewMessageContainer />
        </div>
    </div>)
}

export default Dialogs;