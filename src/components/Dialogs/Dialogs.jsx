import React from 'react';
import s from './Dialogs.module.css';
import { NavLink } from "react-router-dom";
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import NewMessageContainer from './NewMessage/NewMessageContainer';
import StoreContext from '../../StoreContext';

const Dialogs = () => {
    return <StoreContext.Consumer>
        {
            (store) => {
                let state = store.getState();

                let myFriends = state.myFriends.friends
                    .map(d => <DialogItem name={d.name} id={d.id} avatar={d.avatar} />);
                let messagesElements = state.dialogsPage.messages
                    .map(m => <Message message={m.message} id='' />);


                return (<div className={s.dialogs}>
                    <div className={s.dialogsItems}>
                        {myFriends}
                    </div>
                    <div className={s.messages}>
                        {messagesElements}
                    </div>
                    <div>
                        <NewMessageContainer
                            // store={store}
                        //  newMessage={props.dialogsPage.newMessage} 

                        //  dispatch = {props.dispatch}
                        //  updateNewMessageText = { props.updateNewMessageText }
                        //  addMessage = { props.addMessage } 
                        />
                    </div>
                </div>)
            }
        }
    </StoreContext.Consumer>
}

export default Dialogs;