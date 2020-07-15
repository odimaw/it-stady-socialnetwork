// import React from 'react';
// import classes from './Friends.module.css';
// import { NavLink } from "react-router-dom";
// import Friend from './Friend/Friend';
// import StoreContext from '../../../StoreContext';
import Friends from './Friends';
import { connect } from 'react-redux';

// const FriendsContainer = () => {
//     return (<StoreContext.Consumer>
//         {(store) => {

//             let MyFriends = store.getState().myFriends.friends
//                 .map(f => <Friend name={f.name} avatar={f.avatar} id={f.id} />);

//             return (
//                 <div className={classes.friends}>
//                     <NavLink to='/friends' activeClassName={classes.active}>Friends</NavLink>
//                     <div className={classes.allFriend}>
//                         {MyFriends}
//                     </div>
//                 </div>
//             )
//         }}
//     </StoreContext.Consumer>)
// }


let mapStateToProps = (state) => {
    return {
        friends: state.myFriends.friends,
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
  const FriendsContainer = connect(mapStateToProps, mapDispatchToProps) (Friends);
  

export default FriendsContainer;