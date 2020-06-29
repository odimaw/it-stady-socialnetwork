import React from 'react';
import classes from './Friends.module.css';
import {NavLink} from "react-router-dom";
import Friend from './Friend/Friend';

const Friends = (props) => {

    let MyFriends = props.myFriends.friends
    .map(f => <Friend  name={f.name} avatar={f.avatar} id={f.id} />);

    return (
        <div className={classes.friends}>
                <NavLink to='/friends' activeClassName={classes.active}>Friends</NavLink>
            <div className={classes.allFriend}>
                {MyFriends}
            </div>
            </div>
    )
}

export default Friends;