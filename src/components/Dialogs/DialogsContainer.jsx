import React from 'react';
// import s from './Dialogs.module.css';
// import { NavLink } from "react-router-dom";
// import DialogItem from './DialogItem/DialogItem';
// import Message from './Message/Message';
// import NewMessageContainer from './NewMessage/NewMessageContainer';
// import StoreContext from '../../StoreContext';
import { connect } from 'react-redux';
import Dialogs from './Dialogs';
import { Redirect } from 'react-router-dom';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

let mapStateToProps = (state) => {
    return {
        friends: state.myFriends.friends,
        messages: state.dialogsPage.messages,
      
    }
  }
  let mapDispatchToProps = (dispatch) => {
    return {
    //   updateNewMessageBodyCreator: (body) => {
    //     dispatch(updateNewMessageBodyCreator(body));
    //   },
    //   addMessageActionCreator: () => {
    //     dispatch(addMessageActionCreator());
    //   },
    }
  }

// compose(
//   connect(mapStateToProps, mapDispatchToProps),
//   withAuthRedirect
// )(Dialogs);

//   let AuthRedirectComponent = withAuthRedirect(Dialogs);

//   const DialogsContainer = connect(mapStateToProps, mapDispatchToProps) (AuthRedirectComponent);
  

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);